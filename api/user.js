import { userService } from './_userService.js';

export default async function handler(request, response) {
  let user;

  try {
    const { searchParams } = new URL(
      request.url,
      `http://${request.headers.host}`,
    );

    if (!searchParams.has('id')) return response.status(400).end();

    user = await userService.getUser(searchParams.get('id'));

    if (!user) return response.status(404).end();
  } catch (error) {
    console.error(error);
    return response.status(500).end();
  }

  return response.status(200).json({ user });
}
