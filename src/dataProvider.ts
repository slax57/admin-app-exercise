const baseUrl = "https://jsonplaceholder.typicode.com/users/";

export interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

function checkForErrors(response: Response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

function throwErrorRandomly(chanceOfSuccess: number) {
  if (Math.random() > chanceOfSuccess) {
    console.log("Random error generated");
    throw new Error("Random error generated!");
  }
  console.log("Call was successful");
}

export async function findAll(): Promise<User[]> {
  const response = await fetch(baseUrl);
  checkForErrors(response);
  throwErrorRandomly(0.3);
  return response.json();
}

export async function findOne(id: number): Promise<User> {
  const response = await fetch(`${baseUrl}${id}`);
  checkForErrors(response);
  throwErrorRandomly(0.5);
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
  checkForErrors(response);
  throwErrorRandomly(0.5);
  return response.json();
}
