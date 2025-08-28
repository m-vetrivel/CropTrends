import { useEffect, useState } from "react";
import { Client, Storage } from "react-native-appwrite";
import { CommodityEntry, MarketDetail } from "../types";
import { useMemo } from "react";

// 🔧 Appwrite Client Setup
const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform("com.dev.croptrends");

const storage = new Storage(client);

// 🔐 Environment Variables
const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!;
const FILE_ID = "my-json";

// 🧠 Hook: Fetch JSON from Appwrite
export default function useCommodityData() {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJson = async () => {
      try {
        const url = storage.getFileDownloadURL(BUCKET_ID, FILE_ID);
        const response = await fetch(url.toString(), { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch JSON");
        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJson();
  }, []);

  return { data, error, loading };
}

// 🔄 Utility: Transform Nested JSON into Usable Array
export function transformData(raw: Record<string, any>): CommodityEntry[] {
  if (!raw || typeof raw !== "object") return [];

  return Object.entries(raw).map(([commodity, crops]) => ({
    commodity,
    crops: Object.entries(crops as Record<string, any>).map(
      ([crop, places]) => ({
        crop,
        places: Object.entries(places as Record<string, MarketDetail>).map(
          ([place, details]) => ({
            place,
            ...details,
          })
        ),
      })
    ),
  }));
}
