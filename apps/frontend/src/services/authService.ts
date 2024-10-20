type LoginResponse = {
  user: {
    id: number;
    username: string;
  };
  token: string;
};

type RegisterResponse = {
  id: number;
  username: string;
  token: string;
};
export async function login(
  username: string,
  password: string
): Promise<{ data: LoginResponse | null; error: unknown }> {
  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function register(
  username: string,
  password: string
): Promise<{
  data: RegisterResponse | null;
  error: unknown;
}> {
  try {
    const response = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const { data } = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
