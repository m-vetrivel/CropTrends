export type MarketDetail = {
  Arrivals: number;
  "Unit of Arrivals": string;
  Variety: string;
  "Minimum Prices": number;
  "Maximum Prices": number;
  "Modal Prices": number;
  "Unit of Price": string;
};

export type PlaceEntry = {
  place: string;
} & MarketDetail;

export type CropEntry = {
  crop: string;
  places: PlaceEntry[];
};

export type CommodityEntry = {
  commodity: string;
  crops: CropEntry[];
};

export type TrendingCrop = {
  name: string;
  commodity: string;
  avgModalPrice: number;
  totalArrivals: number;
  marketCount: number;
  regions?: string[];
};

export type Crop = {
  name: string;
  avgModalPrice: number;
  totalArrivals: number;
  regions: string[];
};

export type FilterOptions = {
  cropName?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "arrival";
};

export type StorageUploaderScreenProps = {
  onBack: () => void;
};
