export async function getAccountInfo() {
  try {
    const response = await fetch('/api/v1/account/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    const { data } = await response.json();

    return { data, error: null };
  } catch (error: unknown) {
    return { data: null, error };
  }
}
