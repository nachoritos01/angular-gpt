import { environment } from '@env/environment';
type GeneratedImage = ImageResponse | null;
export interface ImageResponse {
  url: string;
  alt: string;
}
export const ImageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string
): Promise<GeneratedImage> => {
  try {
    const response = await fetch(`${environment.backendApi}/image-generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, originalImage, maskImage }),
    });

    const { url, revised_prompt: alt } = await response.json();
    return { url, alt };
  } catch (error) {
    console.error(error);
    return null;
  }
};
