import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
  item: {
    title: string;
    snippet: string | null;
    photo_url: string;
    source_name: string;
    published_datetime_utc: string;
  };
};

export default function NewsRow({ item }: Props) {
  return (
    <View style={styles.card}>
      {item.photo_url ? (
        <Image source={{ uri: item.photo_url }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.snippet}>
        {item.snippet || "No summary available."}
      </Text>
      <Text style={styles.source}>
        📰 {item.source_name} | 🕒{" "}
        {new Date(item.published_datetime_utc).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#222",
  },
  snippet: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  source: {
    fontSize: 12,
    color: "#888",
  },
});
