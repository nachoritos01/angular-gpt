import { Injectable } from '@angular/core';
import {
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
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
}
