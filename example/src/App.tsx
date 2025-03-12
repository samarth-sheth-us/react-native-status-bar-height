import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  useColorScheme,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
  const [statusBarHeightAndroid, setStatusBarHeightAndroid] = useState<
    string | number
  >("N/A");
  const [statusBarHeightIOS, setStatusBarHeightIOS] = useState<string | number>(
    "N/A"
  );

  useEffect(() => {
    async function fetchHeights() {
      const height = await getStatusBarHeight();
      setStatusBarHeight(height);

      if (Platform.OS === "android") {
        const androidHeight = await getStatusBarHeight();
        setStatusBarHeightAndroid(androidHeight);
        setStatusBarHeightIOS("N/A");
      } else if (Platform.OS === "ios") {
        const iosHeight = await getStatusBarHeight();
        setStatusBarHeightIOS(iosHeight);
        setStatusBarHeightAndroid("N/A");
      }
    }

    fetchHeights();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={styles.container.backgroundColor}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Status Bar Height Demo</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Current Platform:</Text>
          <Text style={styles.value}>{Platform.OS}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Status Bar Height:</Text>
          <Text style={styles.value}>{statusBarHeight}px</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Android Height:</Text>
          <Text style={styles.value}>{statusBarHeightAndroid}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>iOS Height:</Text>
          <Text style={styles.value}>{statusBarHeightIOS}</Text>
        </View>

        <View style={[styles.statusBarDemo, { height: statusBarHeight }]}>
          <Text style={styles.demoText}>
            This box height = Status Bar Height ({statusBarHeight}px)
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  statusBarDemo: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  demoText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
});

export default App;
