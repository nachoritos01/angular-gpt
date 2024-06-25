import { Injectable } from '@angular/core';
import { TextMessageBoxEvet } from '@components/index';
import {
  audioToTextUseCase,
  createThreadUseCase,
  ImageGenerationUseCase,
  ImageVariationUseCase,
  orthographyUseCase,
  postQuestionUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
  textToAudioUseCase,
  translateUseCase,
} from '@use-cases/index';
import { from, Observable, of, tap } from 'rxjs';

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
  imageGeneration(prompt: string, originalImage?: string, maskImage?: string) {
    return from(ImageGenerationUseCase(prompt, originalImage, maskImage));
  }
  imageGenerationVariation(originalImage: string) {
    return from(ImageVariationUseCase(originalImage));
  }

  createThread(): Observable<string> {
    const thread = localStorage.getItem('thread');
    if (thread !== undefined && thread !== null && thread !== 'undefined') {
      return of(thread);
    }

    return from(createThreadUseCase()).pipe(
      tap((newThread) => {
        localStorage.setItem('thread', newThread);
      })
    );
  }

  postQuestion(question: string, threadId: string) {
    return from(postQuestionUseCase(question, threadId));
  }
}
