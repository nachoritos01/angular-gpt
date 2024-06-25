import { environment } from 'environments/environment';

export const createThreadUseCase = async () => {
  try {
    const resp = await fetch(`${environment.assistantApi}/create-thread`, {
      method: 'POST',
    });
    console.log(resp);

    const { id } = (await resp.json()) as { id: string };
    console.log(id);

    return id;
  } catch (error) {
    throw new Error('Error creating thread ID');
  }
};
