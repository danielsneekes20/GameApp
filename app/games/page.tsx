// pages/index.tsx

import Image from "next/image";
import Header from "@/app/components/header";
import React, { Suspense } from "react";
import fetchHomepageGames from "@/app/services/fetchHomepageGames";
import Link from "next/link";
import LoadMore from "../components/LoadMore";

const HomePage = async () => {
  const games = await fetchHomepageGames(10, 0);
  // console.log(games);
  return (
    <div>
      <ul className="grid grid-cols-auto-fill-200 gap-8 mx-auto">
        <Suspense fallback={<p>Loading games...</p>}>
          {games.map((game, index) => (
            <Link key={index} href={`/games/${game.slug}`}>
              <li className="rounded-lg bg-secondary text-white bg-white-opacity-15 shadow-custom backdrop-blur-custom">
                <div className="aspect-[200/266] relative">
                  {game.coverImageUrl ? (
                    <Image
                      src={game.coverImageUrl}
                      layout="fill"
                      objectFit="cover"
                      alt={`${game.name} Cover`}
                      loading="lazy"
                      className="rounded-t-lg
                      "
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-gray-300 flex items-center justify-center">
                      <p>No Image</p>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="hyphens-auto text-ellipsis line-clamp-1	">
                    <span className="font-bold hyphens-auto">{game.name}</span>
                  </p>
                  <p>
                    <span>Rating: {Math.round(game.rating)}</span>
                  </p>
                  <p>
                    <span>{}</span>
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </Suspense>
        <LoadMore />
      </ul>
    </div>
  );
};

export default HomePage;
