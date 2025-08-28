// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   TextInput,
//   Platform,
//   StatusBar,
// } from "react-native";

// const API_URL = "https://commodity-prices2.p.rapidapi.com/api/Commodity";
// const API_OPTIONS = {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "8a0fac2073msh79976792fa8e784p14690cjsnb447693cddcf",
//     "x-rapidapi-host": "commodity-prices2.p.rapidapi.com",
//   },
// };

// type Commodity = {
//   name: string;
//   price: number;
//   unit: string;
// };

// const CostPage = () => {
//   const [data, setData] = useState<Commodity[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         const response = await fetch(API_URL, API_OPTIONS);
//         const result = await response.json();
//         console.log(result);
//         setData(result || []);
//       } catch (error) {
//         console.error("Error fetching commodity prices:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrices();
//   }, []);

//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const renderItem = ({ item }: { item: Commodity }) => (
//     <View style={styles.card}>
//       <Text style={styles.title}>{item.name}</Text>
//       <Text style={styles.detail}>
//         💰 {item.price} <Text style={styles.unit}>({item.unit})</Text>
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.root}>
//       <View style={styles.container}>
//         <Text style={styles.header}>🌾 Commodity Prices</Text>
//         <TextInput
//           style={styles.search}
//           placeholder="Search commodity..."
//           value={search}
//           onChangeText={setSearch}
//         />
//         {loading ? (
//           <ActivityIndicator size="large" color="#4CAF50" />
//         ) : (
//           <FlatList
//             data={filteredData}
//             keyExtractor={(item, index) => `${item.name}-${index}`}
//             renderItem={renderItem}
//             contentContainerStyle={styles.list}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default CostPage;

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     paddingTop: 50,
//     paddingHorizontal: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 12,
//     color: "#333",
//   },
//   search: {
//     backgroundColor: "#FFF",
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 16,
//     borderColor: "#CCC",
//     borderWidth: 1,
//   },
//   list: {
//     paddingBottom: 100,
//   },
//   card: {
//     backgroundColor: "#FFF",
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 6,
//     color: "#222",
//   },
//   detail: {
//     fontSize: 14,
//     color: "#555",
//   },
//   unit: {
//     fontSize: 12,
//     color: "#888",
//   },
// });
import {
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useCommodityData, { transformData } from "../../hooks/useCommodityData";
import CommodityContainer from "../../components/CommodityContainer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function CommoditiesPage() {
  const { data, loading, error } = useCommodityData();
  const router = useRouter();

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  if (error)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );

  if (!data) throw new Error("Data is required");
  const transformed = transformData(data);

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#f0f4f8", "#d9e2ec"]} style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.header}>All Commodities</Text>
          <FlatList
            data={transformed}
            keyExtractor={(item) => item.commodity}
            renderItem={({ item }) => (
              <CommodityContainer
                name={item.commodity}
                onPress={() => router.push(`/commodities/${item.commodity}`)}
              />
            )}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
    marginVertical: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#e53e3e",
    fontSize: 16,
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 90,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
