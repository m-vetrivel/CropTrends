import { useMemo } from "react";
import useCommodityData, { transformData } from "./useCommodityData";
import { CommodityEntry, FilterOptions, TrendingCrop } from "../types";

function getTrendingCrops(
  data: CommodityEntry[],
  filters: FilterOptions = {}
): TrendingCrop[] {
  const cropStats: TrendingCrop[] = [];

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

      cropStats.push({
        name: crop,
        commodity,
        avgModalPrice: totalModalPrice / count,
        totalArrivals,
        marketCount: count,
        regions,
      });
    }
  }

  if (filters.sortBy === "arrival") {
    cropStats.sort((a, b) => b.totalArrivals - a.totalArrivals);
  } else {
    cropStats.sort((a, b) => b.avgModalPrice - a.avgModalPrice);
  }

  return cropStats;
}

export function useTrendingCrops(filters?: FilterOptions) {
  const { data, error, loading } = useCommodityData();

  const crops = useMemo(() => {
    if (!data) return [];
    const transformed = transformData(data);
    return getTrendingCrops(transformed, filters);
  }, [data, filters]);

  return { crops, error, loading };
}
