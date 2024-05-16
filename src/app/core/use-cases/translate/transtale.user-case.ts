import { TextMessageBoxEvet } from "@components/index";
import { environment } from "@env/environment";
import { TranslateResponse } from "@interfaces/index";

export const translateUseCase = async (prompt: { prompt: string; lang: string; } ) => {
  try {
    const response = await fetch(
      `${environment.backendApi}/translate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt ),
      }
    );

    if (!response.ok) throw new Error('Error en la petición');

    console.log(response);
    
    const data = (await response.json()) as TranslateResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      ok: false,
      errors: [],
      message: 'Error en la petición al servidor. Intente de nuevo más tarde.',
    };
  }
};
