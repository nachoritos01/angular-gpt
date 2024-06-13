import { environment } from '@env/environment';
type GeneratedImage = ImageResponse | null;
interface ImageResponse {
  url: string;
  alt: string;
}
export const ImageVariationUseCase = async (
  baseImage?: string
): Promise<GeneratedImage> => {
  try {
    const response = await fetch(`${environment.backendApi}/image-variation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ baseImage }),
    });

    const { url, revised_prompt: alt } = await response.json();
    return { url, alt };
  } catch (error) {
    console.error(error);
    return null;
  }
};
