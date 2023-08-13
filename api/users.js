import { userService } from './_userService.js';

export default async function handler(request, response) {
  let users;

  try {
    if (!request.url) return response.status(400).end();
    users = await userService.getUsers();
  } catch (error) {
    console.error(error);
    return response.status(500).end();
  }

  return response.status(200).json({ users });
}
