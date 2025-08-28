import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Crop = {
  name: string;
  avgModalPrice: number;
  totalArrivals: number;
  regions?: string[];
};

export default function CropCard({ crop }: { crop: Crop }) {
  return (
    <View className="m-3 p-4 bg-white/80 rounded-xl shadow-lg border border-gray-200 backdrop-blur-md">
      <Text className="text-lg font-bold text-gray-800">{crop.name}</Text>

      <View className="flex-row items-center mt-2">
        <MaterialCommunityIcons name="currency-inr" size={18} color="#059669" />
        <Text className="text-sm text-green-600 ml-1">
          Avg Price: ₹{crop.avgModalPrice}
        </Text>
      </View>

      <View className="flex-row items-center mt-1">
        <MaterialCommunityIcons
          name="truck-delivery"
          size={18}
          color="#2563eb"
        />
        <Text className="text-sm text-blue-600 ml-1">
          Arrivals: {crop.totalArrivals}
        </Text>
      </View>

      <Text className="text-xs text-gray-500 italic mt-2">
        Regions: {(crop.regions ?? []).slice(0, 3).join(", ")}
        {(crop.regions?.length ?? 0) > 3 ? "..." : ""}
      </Text>
    </View>
  );
}
