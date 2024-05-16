import { environment } from "@env/environment";
import { ProsConsResponse } from '@interfaces/index';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${environment.backendApi}/pros-cons-discusser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) throw new Error('Error en la petición');
    const data = (await response.json()) as ProsConsResponse;
    console.log(data);
    

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      ok: false,
      role:'',
      content: 'Error en la petición al servidor. Intente de nuevo más tarde.',
    };
  }
};
