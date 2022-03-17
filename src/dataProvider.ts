const baseUrl = "https://jsonplaceholder.typicode.com/users/";

export interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

export async function findAll(): Promise<User[]> {
  const response = await fetch(baseUrl);
  return response.json();
}
