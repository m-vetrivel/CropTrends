import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

type SettingsOption = {
  title: string;
};

const settingsOptions: SettingsOption[] = [
  { title: "General" },
  { title: "Account" },
  { title: "Notification" },
  { title: "Theme" },
  { title: "Language" },
  { title: "Rate App" },
  { title: "Privacy Policy" },
  { title: "Help" },
];

export default function SettingsScreen() {
  const [tapCount, setTapCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  // Corrected the type of timerRef to allow for number or NodeJS.Timeout
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePress = () => {
    // Clear the previous timer if it exists to prevent premature reset
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const newCount = tapCount + 1;

    if (newCount === 9) {
      setShowSecret(true);
      setTapCount(0); // reset after success
    } else {
      setTapCount(newCount);
      // set a new timer to reset the count after a pause
      timerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 1000); // 1 second timeout
    }
  };

  const renderItem = ({ item }: { item: SettingsOption }) => (
    <TouchableOpacity
      style={styles.option}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View style={styles.optionInner}>
        <Text style={styles.optionText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#f0f4f8", "#d9e2ec"]} style={styles.root}>
      {!showSecret ? (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent={true}
          />
          <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            <FlatList
              data={settingsOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.title}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </SafeAreaView>
      ) : (
        <StorageUploaderScreen onBack={() => setShowSecret(false)} />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2d3748",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 40,
  },
  option: {
    marginVertical: 8,
    borderRadius: 16,
  },
  optionInner: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    borderWidth: 0, // Border removed
    shadowColor: "transparent", // Shadow removed
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0, // Elevation removed
  },
  optionText: {
    fontSize: 18,
    color: "#2d3748",
  },
});

import * as DocumentPicker from "expo-document-picker";
import { Client, Account, Storage } from "react-native-appwrite";
import "react-native-url-polyfill/auto";
import { StorageUploaderScreenProps } from "../../types";

// --- Appwrite Config ---
const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string) // your endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string) // your project ID
  .setPlatform("com.dev.croptrends"); // your bundle ID

const account = new Account(client);
const storage = new Storage(client);

// Replace with your bucket and file ID
const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID as string;
const FILE_ID = "my-json"; // File ID to overwrite

const StorageUploaderScreen = ({ onBack }: StorageUploaderScreenProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      setIsLoggedIn(true);
      setStatus("✅ Logged in");
    } catch (error: any) {
      setStatus(`❌ Login failed: ${error.message}`);
    }
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        setStatus("Upload cancelled");
        return;
      }

      const file = result.assets[0];

      if (!file.uri) {
        setStatus("❌ No file selected");
        return;
      }

      // Delete old file if exists
      try {
        await storage.deleteFile(BUCKET_ID, FILE_ID);
      } catch (err: any) {
        console.log("Delete skipped:", err.message);
      }

      // Upload file
      const response = await storage.createFile(BUCKET_ID, FILE_ID, {
        name: file.name ?? "data.json",
        type: file.mimeType ?? "application/json",
        uri: file.uri,
        size: file.size ?? 0, //
      });

      setStatus(`✅ File uploaded: ${response.name}`);
    } catch (error: any) {
      setStatus(`❌ Upload failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setIsLoggedIn(false);
      setStatus("👋 Logged out");
    } catch (error: any) {
      setStatus(`❌ Logout failed: ${error.message}`);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View style={styles.container}>
        <Text style={stylesh.title}>Admin Panel</Text>

        {!isLoggedIn && (
          <>
            <TextInput
              style={stylesh.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={stylesh.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <Button title="Login" onPress={handleLogin} />
          </>
        )}

        {isLoggedIn && (
          <>
            <Button title="Upload JSON File" onPress={handleUpload} />
            <View style={{ height: 10 }} />
            <Button title="Logout" onPress={handleLogout} />
          </>
        )}

        {status ? <Text style={stylesh.status}>{status}</Text> : null}
      </View>
      <View className="flex-1 justify-center items-center">
        <Button title="Go Back" onPress={onBack} color="#4CAF50" />
      </View>
    </SafeAreaView>
  );
};

const stylesh = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  status: { marginTop: 20, fontSize: 16, textAlign: "center" },
});
