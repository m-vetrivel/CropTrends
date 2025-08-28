import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DetailsContainer({
  heading,
  details,
}: {
  heading: string;
  details: string;
}) {
  // Regex to extract all numerical values and currency symbols
  const priceRegex = /Min\s₹(\d+)\s*,\s*Max\s₹(\d+)\s*,\s*Modal\s₹(\d+)/;
  const match = details.match(priceRegex);

  let detailsText = details;
  let prices = null;

  if (match) {
    const fullPriceString = match[0];
    // Split the string into the part before prices and the prices part
    const [beforePrices] = details.split(fullPriceString);
    detailsText = beforePrices.trim();
    prices = {
      min: match[1],
      max: match[2],
      modal: match[3],
    };
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#ffffff", "#f0f4f8"]} style={styles.gradient}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.details}>{detailsText}</Text>
        {prices && (
          <View style={styles.priceContainer}>
            <Text style={styles.details}>Prices: </Text>
            <Text style={styles.priceText}>
              Min ₹<Text style={styles.priceValue}>{prices.min}</Text>, Max ₹
              <Text style={styles.priceValue}>{prices.max}</Text>, Modal ₹
              <Text style={styles.priceValue}>{prices.modal}</Text>
            </Text>
            <Text style={styles.details}> (per Kg)</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    overflow: "hidden",
  },
  gradient: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: "#4a5568",
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 8,
  },
  priceText: {
    fontSize: 14,
    color: "#4a5568",
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2e7d32",
  },
});
