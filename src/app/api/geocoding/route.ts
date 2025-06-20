const GEOCODING_ENDPOINT = 'https://api.mapbox.com/search/geocode/v6/forward';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const params: { [key: string]: string } = {
        access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
        q: searchParams.get('q') || '',
        types: 'place',
    };

    const data = await fetch(
        `${GEOCODING_ENDPOINT}?${new URLSearchParams(params)}`
    ).then((res) => res.json());

    return Response.json(data || null);
}
