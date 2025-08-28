import React, { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { router } from "expo-router";
import NewsRow from "../../components/NewsRow2";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const API_URL =
  "https://real-time-news-data.p.rapidapi.com/search?query=agriculture%20crops%20farming&limit=20&time_published=7d&country=IN&lang=en";

const API_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "8a0fac2073msh79976792fa8e784p14690cjsnb447693cddcf",
    "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
  },
};

type Article = {
  article_id: string;
  title: string;
  link: string;
  snippet: string | null;
  photo_url: string;
  source_name: string;
  published_datetime_utc: string;
};

export default function NewsListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL, API_OPTIONS);
        const result = await response.json();
        setArticles(result.data || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LinearGradient colors={["#f0f4f8", "#d9e2ec"]} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.header}>Latest Agriculture News</Text>
          <TextInput
            style={styles.search}
            placeholder="Search agriculture news..."
            value={search}
            onChangeText={setSearch}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : (
            <FlatList
              data={filteredArticles}
              keyExtractor={(item) => item.link}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push(`/news2/${encodeURIComponent(item.link)}`)
                  }
                >
                  <NewsRow item={item} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
    marginVertical: 20,
  },
  search: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
});
