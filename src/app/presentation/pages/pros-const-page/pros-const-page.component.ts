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
  TypingLoaderComponent,
  TextMessageBoxComponent,
} from '@components/index';
import { ProsConsResponse } from '@interfaces/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-pos-const-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-const-page.component.html',
  styleUrl: './pros-const-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConstPageComponent {
  @Input({ required: true }) text!: string;
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openIaService = inject(OpenAIService);

  handleMessage(prompt: string) {
    console.log('prompt', prompt);
    this.isLoading.update(() => true);

    this.messages.update((prev) => [
      ...prev,
      {
        text: prompt,
        isGpt: false,
      },
    ]);

    this.openIaService.checkProsCons(prompt).subscribe((response) => {
      this.isLoading.update(() => false);

      if ('content' in response) {
        this.messages.update((prev) => [
          ...prev,
          {
            text: response.content,
            isGpt: true,
          },
        ]);
     }
    });
  }
}
