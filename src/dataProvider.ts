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

export async function findOne(id: number): Promise<User> {
  const response = await fetch(`${baseUrl}${id}`);
  return response.json();
}

export async function update(user: User): Promise<User> {
  const response = await fetch(`${baseUrl}${user.id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
}
