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
  TextMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-pros-const-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-const-stream-page.component.html',
  styleUrl: './pros-const-stream-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConstStreamPageComponent {
  @Input({ required: true }) text!: string;
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openIaService = inject(OpenAIService);
  public abortSignal = new AbortController();

  async handleMessage( prompt: string ) {

    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.messages.update( prev => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      },
      {
        isGpt: true,
        text: '...'
      }
    ]);


    this.isLoading.set(true);
    const stream = this.openIaService.prosConsStreamDiscusser(prompt, this.abortSignal.signal);
    this.isLoading.set(false);

    for await (const text of stream) {
      this.handleStreamResponse(text);
    }

  }

  handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();

    this.messages.set([...messages, { text: message, isGpt: true }]);
  }
}
