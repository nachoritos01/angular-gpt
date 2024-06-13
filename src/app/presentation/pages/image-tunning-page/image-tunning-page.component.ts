import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Signal,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TypingLoaderComponent,
  TextMessageBoxComponent,
  GptMessageEditableImageComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openia.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GptMessageEditableImageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './image-tunning-page.component.html',
  styleUrl: './image-tunning-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {
  @Input({ required: true }) text!: string;
  public messages = signal<Message[]>([
    {
      text: 'Hello, I am an AI that can help you with your images.',
      isGpt: true,
      imageInfo: {
        url: 'http://localhost:3000/gpt/image-generation/1718282001088',
        alt: 'dumy image',
      },
    },
  ]);
  public isLoading = signal(false);
  public openIaService = inject(OpenAIService);
  public originalImage = signal<string | undefined>(undefined);
  public maksImage = signal<string | undefined>(undefined);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    this.openIaService
      .imageGeneration(prompt, this.originalImage(), this.maksImage())
      .subscribe((response) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          { text: response?.alt!, isGpt: true, imageInfo: response! },
        ]);
      });
  }

  genereteVariation() {
    this.isLoading.set(true);
    this.openIaService
      .imageGenerationVariation(this.originalImage()!)
      .subscribe((response) => {
        this.isLoading.set(false);
        if (!response) return;
        this.messages.update((prev) => [
          ...prev,
          { text: response?.alt!, isGpt: true, imageInfo: response! },
        ]);
      });
  }

  handleSelectedImage(newImage: string, originalImage: string) {
    this.originalImage.set(newImage);
    //Todo trabajar con la mascara
    this.maksImage.set(newImage);
  }
}
