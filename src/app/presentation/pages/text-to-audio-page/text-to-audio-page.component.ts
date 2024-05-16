import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './text-to-audio-page.component.html',
  styleUrl: './text-to-audio-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class TextToAudioPageComponent { }
