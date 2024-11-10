import { fetchTwitchToken } from "./fetchtoken";

interface FetchOptions {
  query?: string; // IGDB SQL-like query as a string
  fields?: string[]; // Fields to fetch
}

export default async function fetchContent(
  
  endpoint: string,
  options?: FetchOptions,

) {
  const url = `https://api.igdb.com/v4/${endpoint}`;

  // Get the access token
  const access_token = await fetchTwitchToken();

  // Construct query for IGDB API as required
  let query = `
    fields ${options?.fields?.join(", ") || "*"};
    ${options?.query || ""}
  
  `;

  // Make the POST request to the IGDB API
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Client-ID": process.env.NEXT_CLIENT_ID || "",
      "Content-Type": "text/plain",
    },
    body: query.trim(), // Send the query in the body
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch content: ${response.statusText}`);
  }

  return await response.json();
}
