// // appwrite.js
import { Client, Storage, Account } from "appwrite";

// const client = new Client()
//   .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) // e.g. https://us-east-1.cloud.appwrite.io/v1
//   .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

// import { Client, Account, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) // e.g. https://us-east-1.cloud.appwrite.io/v1
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID); // Your project ID

export const account = new Account(client);
export const storage = new Storage(client);
