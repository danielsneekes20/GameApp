"use server"
import fetchContent from "@/app/services/fetchContent";

export default async function fetchGameContent(gameName: string) {
  try {
    const games = await fetchContent("games", {
      fields: [
        "name",
        "slug",
        "cover.image_id",
        "rating",
        "platforms.abbreviation",
        "genres.name",
        "summary",
        "release_dates.date",
        "screenshots.image_id",
        "videos.video_id",
      ],
      query: `where slug = "${gameName}";`,
    });

    if (games.length === 0) {
      return null;
    }

    const game = games[0];

    return {
      game
      // coverImageUrl: game.cover?.image_id
      //   ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
      //   : null,
      // screenshots: game.screenshots?.map(
      //   (screenshot: any) =>
      //     `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`,
      // ),
      // platforms: game.platforms?.map((platform: any) => platform.abbreviation),
      // releaseDate: game.release_dates?.[0]?.date
      //   ? new Date(game.release_dates[0].date * 1000).toLocaleDateString()
      //   : "Unknown",
      // genres: game.genres?.map((genre: any) => genre.name),
      // videos: game.videos?.map(
      //   (video: any) => `https://www.youtube.com/watch?v=${video.video_id}`,
      // ),
    };
  } catch (error) {
    console.error("Error fetching game data:", error);
    return null;
  }
}
