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
  TextMessageBoxFileComponent,
  TextMessageEvent,
  TypingLoaderComponent,
} from '@components/index';
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audio-to-text-page.component.html',
  styleUrl: './audio-to-text-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  @Input({ required: true }) text!: string;
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openIaService = inject(OpenAIService);

  handleMessageWithfile({ prompt, file }: TextMessageEvent) {
    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading = signal(true);
    this.messages.update((prev) => [...prev, { text, isGpt: false }]);

    this.openIaService
      .convertAudioToText(file, prompt!)
      .subscribe((response) => this.handleResponse(response));
  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading = signal(false);
    if (!resp) return;

    const message = `
    ##Transcripción:
    __Duración:__ ${Math.round(resp.duration)} segundos.

    ##El texto transcrito es:
    ${resp.text}
    
    `;

    this.messages.update((prev) => [...prev, { text: message, isGpt: false }]);

    for (const segmento of resp.segments) {
      const segmentMessage = `
      __De ${Math.round(segmento.start)} a ${Math.round(
        segmento.end
      )} segundos:.__
      ${segmento.text}
      `;
      this.messages.update((prev) => [
        ...prev,
        { text: segmentMessage, isGpt: true },
      ]);
    }
  }
}
