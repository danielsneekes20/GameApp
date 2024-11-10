"use server";

import fetchContent from "@/app/services/fetchContent";

export default async function fetchHighRatingGames(
  limit: number,
  offset: number,
) {

  try {
    console.log("Fetching high rating games...");
    console.log("Limit:", limit);
    console.log("Offset:", offset);
    // Fetch the games with high ratings and given limit/offset
    const games = await fetchContent("games", {
      fields: ["name", "slug", "cover.image_id", "rating", "platforms"],
      query: `where rating > 10 & platforms = [48, 167]; limit ${limit}; offset ${offset};`,

    });
    console.log("Games data:", games);
    // Map through the games and construct the cover image URL
    return games.map((game: any) => ({
      ...game,
      coverImageUrl: game.cover?.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`
        : null, // If no cover image, set it to null
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array on error
  }
}
