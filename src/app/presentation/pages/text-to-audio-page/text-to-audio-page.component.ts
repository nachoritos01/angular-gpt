import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import {
  ChatMessageComponent,
  MyMessageComponent,
  Option,
  TextMessageBoxEvet,
  TextMessageBoxSelectComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './text-to-audio-page.component.html',
  styleUrl: './text-to-audio-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {
  @Input({ required: true }) text!: string;
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openIaService = inject(OpenAIService);

  public options = signal<Option[]>([
    { id: 'echo', text: 'echo' },
    { id: 'alloy', text: 'alloy' },
    { id: 'fable', text: 'fable' },
    { id: 'onyx', text: 'onyx' },
    { id: 'nova', text: 'nova' },
    { id: 'shimmer', text: 'shimmer' },
  ]);

  handleMessageWithSlect({ prompt, selectedOption }: TextMessageBoxEvet) {
    this.isLoading.set(true);

    const message = `${prompt} - ${selectedOption}`;
    this.messages.update((prev) => [...prev, { text: message, isGpt: false }]);

    this.openIaService
      .convertTextToAudio(prompt, selectedOption)
      .subscribe(({ message, audioUrl}) => {
       

        console.log(message, audioUrl);
        
        this.isLoading.set(false);

        this.messages.update((prev) => [
          ...prev,
          { text: message, isGpt: true, audioUrl },
        ]);
      });
  }
}
