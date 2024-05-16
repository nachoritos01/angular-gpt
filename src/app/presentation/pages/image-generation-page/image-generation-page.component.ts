import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './image-generation-page.component.html',
  styleUrl: './image-generation-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class ImageGenerationPageComponent { }
