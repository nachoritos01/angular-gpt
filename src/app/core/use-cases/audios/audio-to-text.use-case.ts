import { environment } from '@env/environment';
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);

    if (prompt) {
      formData.append('prompt', prompt);
    }

    const response = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    console.log(response);

    if (!response) {
      throw new Error('No se pudo transcribir el audio. Intente de nuevo.');
    }

    const data = (await response.json()) as AudioToTextResponse;

    return data;
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
};
