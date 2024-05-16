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
  TextMessageBoxEvet,
  TextMessageBoxSelectComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './translate-page.component.html',
  styleUrl: './translate-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {
  @Input({ required: true }) text!: string;
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openIaService = inject(OpenAIService);

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvet) {
    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      },
    ]);

    this.openIaService
      .translate({ prompt, lang: selectedOption })
      .subscribe((response) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          {
            text: response.message,
            isGpt: true,
          },
        ]);
      });
  }
}
