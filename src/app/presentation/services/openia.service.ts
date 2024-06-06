import { Injectable } from '@angular/core';
import { TextMessageBoxEvet } from '@components/index';
import {
  audioToTextUseCase,
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
  textToAudioUseCase,
  translateUseCase,
} from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }
  checkProsCons(prompt: string) {
    return from(prosConsUseCase(prompt));
  }
  prosConsStreamDiscusser(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }
  translate(prompt: { prompt: string; lang: string }) {
    return from(translateUseCase(prompt));
  }

  convertTextToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }
  convertAudioToText(audioFile: File, prompt?: string) {
    return from(audioToTextUseCase(audioFile, prompt));
  }
}
