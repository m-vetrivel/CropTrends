# CropTrends 🌾 Your Smart Farming Companion

**CropTrends** is a comprehensive React Native mobile application designed to empower farmers by providing crucial, real-time data to make informed decisions. The app serves as an all-in-one hub for localized weather forecasts, daily crop market prices, and the latest agricultural news.

---

## 🤔 Why I Built CropTrends

Farmers traditionally face a significant challenge: information is scattered, often delayed, and hard to access. To make critical decisions about harvesting, selling produce, and protecting crops, they need to consult separate sources for weather, find reliable market rates, and stay updated on agricultural news. This fragmentation can lead to missed opportunities and reduced profitability.

I built **CropTrends** to solve this problem by centralizing all essential information into a single, user-friendly mobile application. The goal is to provide farmers with actionable, up-to-the-minute data right at their fingertips, helping them to maximize their yield, get the best prices for their crops, and stay ahead of environmental and market changes.

---

## 🛠️ Tech Stack

* **Mobile Framework:** React Native
* **Backend & Database:** Appwrite
* **APIs & Data Sources:**
    * **Market Data:** AGMARKNET API
    * **Weather Forecast:** Open-Meteo API
    * **Agricultural News:** RapidAPI

---

## 📖 Features

CropTrends is built with a feature set specifically tailored to the needs of modern farmers.

### 🌦️ Hyperlocal Weather Forecasts
Get detailed weather information for your specific location, including:
* Current conditions (Temperature, Humidity, Wind Speed).
* 7-day detailed forecast.
* Crucial agricultural metrics like **Soil Temperature**, **Soil Moisture**, and **UV Index**.
* Sunrise, sunset, and daylight duration to help plan your day.

### 📈 Real-Time Market Prices & Trends
Access live data from local markets to ensure you get the best price for your produce:
* Browse commodities by category (Fruits, Cereals, Flowers, etc.).
* View detailed price information for specific crops, including **Minimum**, **Maximum**, and **Modal** prices per Kg.
* Track **market arrivals** in tonnes to gauge supply and demand.
* See which crops are **trending** based on demand or arrival volume.

### 📰 Latest Agricultural News
Stay informed with a dedicated news feed that aggregates the latest articles and updates in the world of agriculture. Includes a search functionality to find news on specific topics.

### ⚙️ Admin Panel Management
Crop and market data is kept up-to-date and managed through a dedicated admin panel, ensuring the information provided to farmers is always current and accurate.

---

## 🚀 Quick Start & Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites
* Node.js and npm/yarn installed.
* React Native development environment set up (see [React Native Docs](https://reactnative.dev/docs/environment-setup)).
* An Appwrite instance running.

### Installation & Setup
1.  **Clone the repo**
    ```bash
    git clone [https://github.com/m-vetrivel/CropTrends.git](https://github.com/m-vetrivel/CropTrends.git)
    cd CropTrends
    ```

2.  **Install NPM packages**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root of the project and add your API keys and Appwrite configuration details.
    ```
    # Appwrite
    APPWRITE_ENDPOINT=[https://cloud.appwrite.io/v1](https://cloud.appwrite.io/v1)
    APPWRITE_PROJECT_ID=YOUR_PROJECT_ID

    # APIs
    RAPIDAPI_API_KEY=YOUR_RAPIDAPI_KEY
    ```

4.  **Run the application**
    * For Android:
        ```bash
        npx react-native run-android
        ```
    * For iOS:
        ```bash
        npx react-native run-ios
        ```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! If you'd like to contribute, please fork the repository and open a pull request to the `main` branch.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/NewFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some NewFeature'`)
4.  **Push to the Branch** (`git push origin feature/NewFeature`)
5.  **Open a Pull Request**

---
