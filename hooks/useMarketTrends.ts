import { useMemo } from "react";
import useCommodityData, { transformData } from "./useCommodityData";
import { CommodityEntry, FilterOptions, TrendingCrop } from "../types";

export function getTrendingCrops(
  data: CommodityEntry[],
  filters: FilterOptions = {}
): TrendingCrop[] {
  const cropStatsMap = new Map<string, TrendingCrop>();

  for (const { commodity, crops } of data) {
    for (const { crop, places } of crops) {
      if (filters.cropName && crop !== filters.cropName) continue;

      let totalModalPrice = 0;
      let totalArrivals = 0;
      let count = 0;
      const regions: string[] = [];

      for (const place of places) {
        if (filters.region && place.place !== filters.region) continue;

        const price = place["Modal Prices"];
        if (
          (filters.minPrice && price < filters.minPrice) ||
          (filters.maxPrice && price > filters.maxPrice)
        )
          continue;

        totalModalPrice += price;
        totalArrivals += place.Arrivals;
        regions.push(place.place);
        count += 1;
      }

      if (count === 0) continue;

      const avgModalPrice = totalModalPrice / count;

      cropStatsMap.set(`${commodity}-${crop}`, {
        name: crop,
        commodity,
        avgModalPrice,
        totalArrivals,
        marketCount: count,
        regions,
      });
    }
  }

  return Array.from(cropStatsMap.values()).sort(
    (a, b) => b.avgModalPrice - a.avgModalPrice
  );
}

export default function useMarketTrends(filters?: FilterOptions) {
  const { data, error, loading } = useCommodityData();

  const trending = useMemo(() => {
    if (!data) return [];
    const transformed = transformData(data);
    return getTrendingCrops(transformed, filters);
  }, [data, filters]);

  return { trending, error, loading };
}
