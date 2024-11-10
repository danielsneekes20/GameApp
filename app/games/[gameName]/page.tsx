import Image from "next/image";
import React, { Suspense } from "react";
import fetchGameContent from "@/app/services/fetchGameContent"; // Service to call IGDB API
import GameInfo from "@/app/components/GameInfo";

interface GamePageProps {
  params: Promise<{
    gameName: string;
  }>;
}

export default async function GamePage(props: GamePageProps) {
  const params = await props.params;
  return (
    <>
      <Suspense fallback={"Loading"}>
        <GameInfo gameSlug={params.gameName} />
      </Suspense>
    </>
  );
}
