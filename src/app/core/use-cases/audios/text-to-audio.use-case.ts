import { environment } from '@env/environment';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const response = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!response.ok)
      throw new Error('No se pudo generar el audio. Intente de nuevo.');

    const audiFile = await response.blob();

    const audioUrl = URL.createObjectURL(audiFile);

    return {
      ok: true,
      message: prompt,
      audioUrl,
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      ok: true,
      message: 'Error en la petición al servidor. Intente de nuevo más tarde.',
      audioUrl: '',
    };
  }
};
