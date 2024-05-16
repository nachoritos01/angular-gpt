import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './chat-template.component.html',
  styleUrl: './chat-template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  @Input({ required: true }) text!: string;
  public messages = signal<Message[]>([
    { text: 'Hello', isGpt: true },
    { text: 'hi', isGpt: false },
  ]);
  public isLoading = signal(false);
  public openIaService = inject(OpenAIService);

  handleMessage(prompt: string) {
    console.log('prompt', prompt);
  }
  /* handleMessageWithfile({ prompt, file }: TextMessageEvent) {
    console.log({ prompt, file });
  }
  handleMessageWithSlect(event : TextMessageBoxEvet) {
    console.log(event);
  } */
}
