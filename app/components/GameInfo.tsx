// "use client";

import fetchGameContent from "../services/fetchGameContent";
import Image from "next/image";

// import { useState, useEffect } from "react";
// import fetchGameContent from "../services/fetchGameContent";

// interface GameInfoProps {
//   gameSlug: string;
// }

// export default function GameInfo({ gameSlug }: GameInfoProps) {
//   const [game, setGame] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         console.log("Fetching game details for:", gameSlug);
//         const data = await fetchGameContent(gameSlug);
//         setGame(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching Pokemon details:", error);
//       }
//     };

//     fetchDetails();
//   }, [gameSlug]);

//   return (
//     <div>
//       {!loading && game ? (
//         <div>
//           <h1>{game.name}</h1>
//           <p>{game.summary}</p>
//           <img src={game.coverImageUrl} alt={game.name} />
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//       {/* <div className="container mx-auto p-4">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//
//         </>
//       )}
//     </div> */}
//     </div>
//   );
// }

interface GameInfoProps {
  gameSlug: string;
}

export default async function GameInfo({ gameSlug }: GameInfoProps) {
  const {game} = await fetchGameContent(gameSlug);
  console.log("Game data:", game);
  console.log(game.cover.image_id);

  return (
    <>
      <h1 className="text-3xl font-bold">{game.name}</h1>
      <div className="my-4">
          <Image
          src={`https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`} 
          width={200}
            height={266}
            alt={`${game.name} Cover`}
          />
      </div>
      <p>Rating: {Math.round(game.rating)}</p>
      <p>{game.summary}</p>{" "}
    </>
  );
}
