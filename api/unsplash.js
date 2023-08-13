import { Readable } from 'node:stream';

const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

export default async function handler(request, response) {
  try {
    const { searchParams } = new URL(
      request.url,
      `http://${request.headers.host}`,
    );

    const searchTerm = searchParams.get('searchTerm');

    if (!searchTerm) {
      return response.status(400).json({ error: 'No search term' });
    }

    const unsplashUrl = new URL(UNSPLASH_URL);
    unsplashUrl.searchParams.set('query', searchTerm);
    unsplashUrl.searchParams.set(
      'per_page',
      searchParams.get('maxResults') ?? 10,
    );
    unsplashUrl.searchParams.set('page', searchParams.get('page') ?? 1);
    unsplashUrl.searchParams.set('client_id', process.env.UNSPLASH_API_KEY);

    const unsplashResponse = await fetch(unsplashUrl);

    if (!unsplashResponse.ok) {
      return response.status(500).json({ error: 'Server error' });
    }

    return Readable.from(unsplashResponse.body).pipe(
      response.status(200).setHeader('Content-Type', 'application/json'),
    );
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Server error' });
  }
}
