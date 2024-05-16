import { environment } from "@env/environment";
import { OrthographyResponse } from "@interfaces/orthography.response";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${environment.backendApi}/orthography-check`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) throw new Error('Error en la petición');
    const data = (await response.json()) as OrthographyResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'Error en la petición al servidor. Intente de nuevo más tarde.',
    };
  }
};
