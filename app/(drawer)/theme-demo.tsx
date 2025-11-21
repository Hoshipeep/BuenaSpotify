import { useState } from "react";
import { View, Text, Switch, TextInput, Image, StyleSheet, ScrollView} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function PhotoPreviewTheme({ route }) {
  const { photoUri } = useLocalSearchParams();
  const [isDark, setIsDark] = useState(false);
  const [accent, setAccent] = useState("#1DB954"); // Spotify green

  const bg = isDark ? "#111" : "#fff";
  const text = isDark ? "#fff" : "#000";

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: text }]}>Photo Preview & Theme</Text>

      {/* Photo Preview */}
      <View style={[styles.photoContainer, { borderColor: accent }]}>
        <Image
          source={{ uri: photoUri }}
          style={styles.photo}
          resizeMode="cover"
        />
      </View>

      {/* Theme Controls */}
      <View style={styles.controlRow}>
        <Text style={[styles.controlLabel, { color: text }]}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={setIsDark} />
      </View>

      <Text style={[styles.controlLabel, { color: text }]}>Accent Color (Hex)</Text>
      <TextInput
        value={accent}
        onChangeText={setAccent}
        style={styles.accentInput}
      />

      {/* Accent Preview */}
      <View style={[styles.accentPreview, { backgroundColor: accent }]}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Accent Preview</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  photoContainer: {
    width: "100%",
    height: 300,
    borderWidth: 4,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 18,
  },
  accentInput: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  accentPreview: {
    height: 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
