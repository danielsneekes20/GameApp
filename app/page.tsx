import Image from "next/image";
import Header from "@/app/components/header.tsx";

// pages/index.tsx
import React from "react";
import { fetchTwitchToken } from "@/app/services/fetchtoken"; // Adjust the import path if necessary

const HomePage = async () => {
  let token: string | null = null;

  try {
    token = await fetchTwitchToken();
  } catch (error) {
    console.error(error);
    token = null; // Handle error gracefully
  }

  return (
    <div>
      <h1>Welcome to the Twitch Token Fetcher</h1>
      {token ? <p>Your token: {token}</p> : <p>Failed to fetch token.</p>}
    </div>
  );
};

export default HomePage;
