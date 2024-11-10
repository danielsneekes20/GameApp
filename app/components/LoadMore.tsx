"use client";

import Image from "next/image";
import { use, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import fetchHomepageGames from "@/app/services/fetchHomepageGames";
import { useState } from "react";
import Link from "next/link";
import { Suspense } from "react";

let page= 10;

function LoadMore() {
  const { ref, inView } = useInView({});
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (inView) {
        console.log("Fetching more games");
      fetchHomepageGames(10, page).then((res) => {
        setGames([...games, ...res]);
        page+=10;
        console.log(page);
      });
    }
  }, [inView, games]);
  return (
    <>
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
      <div ref={ref} className="mx-auto">
        <Image src="/spinner.svg" alt="Placeholder" width={50} height={50} />
      </div>
    </>
  );
}

export default LoadMore;
