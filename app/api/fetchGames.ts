import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { fetchTwitchToken } from '@/app/services/fetchToken'; // Replace with your actual token fetching logic

const fetchGamesFromIGDB = async (limit, offset) => {
  const accessToken = await fetchTwitchToken();
  const clientId = process.env.NEXT_CLIENT_ID;
  const clientSecret = process.env.NEXT_CLIENT_SECRET;

  const response = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'text/plain',
    },
    body: `
      fields name, slug, cover.image_id, rating, platforms;
      where rating > 60 & platforms = [48, 167];
      limit ${limit};
      offset ${offset};
    `,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }

  return response.json();
};

export default async function handler(req, res) {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const games = await fetchGamesFromIGDB(Number(limit), Number(offset));
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
}
