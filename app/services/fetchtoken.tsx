"use server";

require("dotenv").config();
interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

let accessToken = null as string | null;

export const fetchTwitchToken = async (): Promise<string> => {
  const clientId = process.env.NEXT_CLIENT_ID;
  const clientSecret = process.env.NEXT_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing Twitch client ID or client secret in environment variablessss",
    );
  }
  if (accessToken) {
    return accessToken;
  }

  const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch token: ${response.statusText}`);
  }

  const data: TwitchTokenResponse = await response.json();
  console.log("hier");
  console.log(data.access_token);
  accessToken = data.access_token;
  return data.access_token;
};
