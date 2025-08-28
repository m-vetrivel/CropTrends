// // // import React, { useEffect, useState, useCallback } from "react";
// // // import { View, Text, ScrollView, RefreshControl } from "react-native";
// // // import AsyncStorage from "@react-native-async-storage/async-storage";

// // // // Import your Appwrite client to get base endpoint and project
// // // import client from "../../services/appwrite";

// // // export default function JsonViewer() {
// // //   const [jsonData, setJsonData] = useState<any>(null);
// // //   const [refreshing, setRefreshing] = useState(false);

// // //   const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!;
// // //   const FILE_ID = "my-json";

// // //   const baseEndpoint = client.config.endpoint;
// // //   const projectId = client.config.project;

// // //   const fetchJson = async () => {
// // //     try {
// // //       // Build download URL manually
// // //       const url = `${baseEndpoint}/storage/buckets/${BUCKET_ID}/files/${FILE_ID}/download?project=${projectId}`;

// // //       const response = await fetch(url);
// // //       const data = await response.json();

// // //       console.log("Fetched JSON:", data);

// // //       await AsyncStorage.setItem("localJson", JSON.stringify(data));
// // //       setJsonData(data);
// // //     } catch (err: any) {
// // //       console.error("Fetch failed, using cache:", err);
// // //       const cached = await AsyncStorage.getItem("localJson");
// // //       if (cached) {
// // //         setJsonData(JSON.parse(cached));
// // //         console.log("Loaded from cache");
// // //       }
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchJson();
// // //   }, []);

// // //   const onRefresh = useCallback(async () => {
// // //     setRefreshing(true);
// // //     await fetchJson();
// // //     setRefreshing(false);
// // //   }, []);

// // //   return (
// // //     <ScrollView
// // //       style={{ flex: 1, padding: 20 }}
// // //       refreshControl={
// // //         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
// // //       }
// // //     >
// // //       <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
// // //         JSON Data:
// // //       </Text>
// // //       <Text>
// // //         {jsonData ? JSON.stringify(jsonData, null, 2) : "No data available"}
// // //       </Text>
// // //     </ScrollView>
// // //   );
// // // }

// // import { Client, Storage } from 'react-native-appwrite';

// // const client = new Client()
// //   .setEndpoint('https://<REGION>.cloud.appwrite.io/v1')
// //   .setProject('<PROJECT_ID>');

// // const storage = new Storage(client);

// // Download file as ArrayBuffer
// // const result = await storage.getFileDownload('<BUCKET_ID>', '<FILE_ID>');
// // console.log(result);

// // Get direct download URL
// // const downloadUrl = storage.getFileDownloadURL('<BUCKET_ID>', '<FILE_ID>');
// // console.log(downloadUrl);

// // JsonService.tsx

// // const fetchJsonData = async (
// //   bucketId: string,
// //   fileId: string
// // ): Promise<any> => {
// //   try {
// //     const response = await storage.getFileDownload(bucketId, fileId);
// //     const buffer = await response.arrayBuffer();
// //     const text = new TextDecoder().decode(buffer);
// //     const json = JSON.parse(text);
// //     return json;
// //   } catch (error) {
// //     console.error("Failed to fetch JSON:", error);
// //     throw error;
// //   }
// // };

// // import { Client, Storage } from "react-native-appwrite";

// // const client = new Client()
// //   .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Replace with your endpoint
// //   .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!) // Replace with your project ID
// //   .setPlatform("com.dev.croptrends"); // Replace with your bundle ID

// // const storage = new Storage(client);
// // import React, { useEffect, useState } from "react";
// // import { View, Text, ScrollView, StyleSheet } from "react-native";
// // import "react-native-url-polyfill/auto";

// // const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!;
// // const FILE_ID = "my-json";

// // const JsonViewer = () => {
// //   const [data, setData] = useState<any>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchJson = async () => {
// //       try {
// //         const url = storage.getFileDownloadURL(BUCKET_ID, FILE_ID);
// //         const response = await fetch(url.toString());
// //         const json = await response.json();
// //         setData(json);
// //       } catch (err: any) {
// //         setError(err.message);
// //       }
// //     };

// //     fetchJson();
// //   }, []);

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.title}>JSON File Content</Text>
// //       {error ? (
// //         <Text style={styles.error}>Error: {error}</Text>
// //       ) : data ? (
// //         <Text style={styles.json}>{JSON.stringify(data, null, 2)}</Text>
// //       ) : (
// //         <Text>Loading...</Text>
// //       )}
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { padding: 20 },
// //   title: { fontSize: 20, marginBottom: 10 },
// //   error: { color: "red" },
// //   json: { fontFamily: "monospace", fontSize: 14 },
// // });

// // export default JsonViewer;

// import { Client, Storage } from "react-native-appwrite";

// const client = new Client()
//   .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Replace with your endpoint
//   .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!) // Replace with your project ID
//   .setPlatform("com.dev.croptrends"); // Replace with your bundle ID

// const storage = new Storage(client);
// import React, { useEffect, useState, useCallback } from "react";
// import { ScrollView, Text, StyleSheet, RefreshControl } from "react-native";
// import "react-native-url-polyfill/auto";

// const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!;
// const FILE_ID = "my-json";

// const JsonViewer = () => {
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);

//   // 🔹 Fetch JSON directly from Appwrite file URL
//   const fetchJson = async () => {
//     try {
//       const url = storage.getFileDownloadURL(BUCKET_ID, FILE_ID);
//       const response = await fetch(url.toString(), {
//         cache: "no-store", // make sure it doesn't return cached
//       });
//       if (!response.ok) throw new Error("Failed to fetch JSON");
//       const json = await response.json();
//       setData(json);
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // 🔹 Load once on mount
//   useEffect(() => {
//     fetchJson();
//   }, []);

//   // 🔹 Swipe-to-refresh: refetch from URL
//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await fetchJson();
//     setRefreshing(false);
//   }, []);

//   // 🔹 Extract first element
//   const getFirstElement = (json: any) => {
//     if (Array.isArray(json)) {
//       return json[0];
//     } else if (json && typeof json === "object") {
//       const firstKey = Object.keys(json)[0];
//       return { [firstKey]: json[firstKey] };
//     }
//     return json;
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     >
//       <Text style={styles.title}>JSON File (First Element)</Text>
//       {error ? (
//         <Text style={styles.error}>Error: {error}</Text>
//       ) : data ? (
//         <Text style={styles.json}>
//           {JSON.stringify(getFirstElement(data), null, 2)}
//         </Text>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   title: { fontSize: 20, marginBottom: 10, fontWeight: "bold" },
//   error: { color: "red", marginTop: 10 },
//   json: { fontFamily: "monospace", fontSize: 14, marginTop: 10 },
// });

// export default JsonViewer;

// import { View, Text, FlatList } from "react-native";
// import useMarketTrends from "../../hooks/useMarketTrends";
// import TrendCard from "../../components/TrendCard";

// export default function TrendingMarketScreen() {
//   const { trending, loading, error } = useMarketTrends({
//     minPrice: 1000,
//     maxPrice: 5000,
//   });

//   if (loading)
//     return (
//       <Text className="text-center mt-10 text-gray-500">Loading trends...</Text>
//     );
//   if (error)
//     return (
//       <Text className="text-center mt-10 text-red-500">Error: {error}</Text>
//     );

//   return (
//     <View className="flex-1 bg-white px-4 pt-6">
//       <Text className="text-xl font-bold mb-4 text-gray-800">
//         📈 Trending Crops
//       </Text>

//       <FlatList
//         data={trending}
//         keyExtractor={(item) => `${item.commodity}-${item.name}`}
//         renderItem={({ item }) => <TrendCard crop={item} />}
//         ItemSeparatorComponent={() => <View className="h-2" />}
//       />
//     </View>
//   );
// }

// import React, { useState, useMemo } from "react";
// import { View, Text, FlatList, Switch } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useTrendingCrops } from "../../hooks/useTrendingCrops";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function TrendingCropDashboard() {
//   const { crops, loading, error } = useTrendingCrops();
//   const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
//     undefined
//   );
//   const [sortByPrice, setSortByPrice] = useState(true);
//   const [sortByArrival, setSortByArrival] = useState(false);

//   const handleTogglePrice = (value: boolean) => {
//     setSortByPrice(value);
//     setSortByArrival(!value);
//   };

//   const handleToggleArrival = (value: boolean) => {
//     setSortByArrival(value);
//     setSortByPrice(!value);
//   };

//   const allRegions = useMemo(() => {
//     return Array.from(
//       new Set(crops.flatMap((crop) => crop.regions ?? []))
//     ).sort();
//   }, [crops]);

//   const filteredCrops = useMemo(() => {
//     let result = [...crops];
//     if (selectedRegion) {
//       result = result.filter((crop) => crop.regions?.includes(selectedRegion));
//     }
//     if (sortByPrice) {
//       result.sort((a, b) => b.avgModalPrice - a.avgModalPrice);
//     } else if (sortByArrival) {
//       result.sort((a, b) => b.totalArrivals - a.totalArrivals);
//     }
//     return result;
//   }, [crops, selectedRegion, sortByPrice, sortByArrival]);

//   if (loading)
//     return (
//       <Text className="p-4 text-gray-500 text-center">Loading crops...</Text>
//     );
//   if (error)
//     return (
//       <Text className="p-4 text-red-500 text-center">Error loading data</Text>
//     );

//   return (
//     <SafeAreaView className="flex-1">
//       <View className="flex-1 bg-gradient-to-b from-gray-100 to-gray-200">
//         {/* Controls */}
//         <View className="px-4 py-4 bg-white shadow-sm rounded-b-xl">
//           <Text className="text-xl font-bold text-gray-800 mb-3">
//             📊 Market Trends
//           </Text>

//           <View className="bg-gray-100 rounded-lg mb-3">
//             <Picker
//               selectedValue={selectedRegion}
//               onValueChange={(value: string) => setSelectedRegion(value)}
//               className="text-gray-700"
//             >
//               <Picker.Item label="All Regions" value={null} />
//               {allRegions.map((region) => (
//                 <Picker.Item key={region} label={region} value={region} />
//               ))}
//             </Picker>
//           </View>

//           <View className="flex-row justify-between mt-2">
//             <View className="flex-row items-center gap-2">
//               <Switch value={sortByPrice} onValueChange={handleTogglePrice} />
//               <Text className="text-sm text-gray-700">Trending by Demand</Text>
//             </View>
//             <View className="flex-row items-center gap-2">
//               <Switch
//                 value={sortByArrival}
//                 onValueChange={handleToggleArrival}
//               />
//               <Text className="text-sm text-gray-700">Trending by Arrival</Text>
//             </View>
//           </View>
//         </View>

//         {/* Crop List */}
//         <FlatList
//           data={filteredCrops}
//           keyExtractor={(item) => item.name}
//           contentContainerStyle={{ paddingBottom: 100 }}
//           renderItem={({ item }) => (
//             <View className="m-3 p-4 bg-white rounded-xl shadow-md border border-gray-100">
//               <Text className="text-lg font-semibold text-gray-800">
//                 {item.name}
//               </Text>
//               <Text className="text-sm text-green-600 mt-1">
//                 Avg Price: ₹{item.avgModalPrice}
//               </Text>
//               <Text className="text-sm text-blue-600">
//                 Arrivals: {item.totalArrivals}
//               </Text>
//               <Text className="text-xs text-gray-500 italic mt-1">
//                 Regions: {(item.regions ?? []).slice(0, 3).join(", ")}
//                 {(item.regions?.length ?? 0) > 3 ? "..." : ""}
//               </Text>
//             </View>
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }
import React, { useState, useMemo } from "react";
import { View, Text, FlatList, Switch, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTrendingCrops } from "../../hooks/useTrendingCrops";
import { SafeAreaView } from "react-native-safe-area-context";
import CropCard from "../../components/TrendCard";
import { LinearGradient } from "expo-linear-gradient";

export default function TrendingCropDashboard() {
  const { crops, loading, error } = useTrendingCrops();
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
    undefined
  );
  const [sortByPrice, setSortByPrice] = useState(true);
  const [sortByArrival, setSortByArrival] = useState(false);

  const handleTogglePrice = (value: boolean) => {
    setSortByPrice(value);
    setSortByArrival(!value);
  };

  const handleToggleArrival = (value: boolean) => {
    setSortByArrival(value);
    setSortByPrice(!value);
  };

  const allRegions = useMemo(() => {
    return Array.from(
      new Set(crops.flatMap((crop) => crop.regions ?? []))
    ).sort();
  }, [crops]);

  const filteredCrops = useMemo(() => {
    let result = [...crops];
    if (selectedRegion) {
      result = result.filter((crop) => crop.regions?.includes(selectedRegion));
    }
    if (sortByPrice) {
      result.sort((a, b) => b.avgModalPrice - a.avgModalPrice);
    } else if (sortByArrival) {
      result.sort((a, b) => b.totalArrivals - a.totalArrivals);
    }
    return result;
  }, [crops, selectedRegion, sortByPrice, sortByArrival]);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <Text style={styles.messageText}>Loading crops...</Text>
      </View>
    );
  if (error)
    return (
      <View className="flex-1 justify-center items-center">
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Controls Section */}
        <LinearGradient
          colors={["#ffffff", "#f0f4f8"]}
          style={styles.controlsGradient}
        >
          <Text style={styles.header}>📊 Market Trends</Text>

          {/* Picker */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedRegion}
              onValueChange={(value: string) => setSelectedRegion(value)}
              style={styles.picker}
            >
              <Picker.Item label="All Regions" value={null} />
              {allRegions.map((region) => (
                <Picker.Item key={region} label={region} value={region} />
              ))}
            </Picker>
          </View>

          {/* Sort Switches */}
          <View style={styles.switchContainer}>
            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>Trending by Demand</Text>
              <Switch
                value={sortByPrice}
                onValueChange={handleTogglePrice}
                trackColor={{ false: "#767577", true: "#4caf50" }}
                thumbColor={sortByPrice ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>
            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>Trending by Arrival</Text>
              <Switch
                value={sortByArrival}
                onValueChange={handleToggleArrival}
                trackColor={{ false: "#767577", true: "#2196f3" }}
                thumbColor={sortByArrival ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Crop List */}
        <FlatList
          data={filteredCrops}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => <CropCard crop={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  container: {
    flex: 1,
  },
  controlsGradient: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 16,
  },
  pickerWrapper: {
    backgroundColor: "#edf2f7",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#4a5568",
  },
  switchContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  switchItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  switchLabel: {
    fontSize: 14,
    color: "#4a5568",
    fontWeight: "600",
  },
  messageText: {
    padding: 16,
    textAlign: "center",
    color: "#718096",
  },
  errorText: {
    padding: 16,
    textAlign: "center",
    color: "#e53e3e",
  },
  listContainer: {
    paddingVertical: 10,
  },
});
