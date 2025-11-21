import { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

export default function CameraDemo() {

  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [filter, setFilter] = useState("none");
  const cameraRef = useRef(null);

  if (!permission?.granted) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          backgroundColor: "#111",
        }}
      >
        <Text style={{ marginBottom: 15, color: "white", fontSize: 16 }}>
          Camera access is required.
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: "#4A90E2",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

    const getFilterStyle = () => {
      switch (filter) {
        case "gray":
          return {
            backgroundColor: "rgba(120,120,120,0.35)",
          };
        case "sepia":
          return {
            backgroundColor: "rgba(112, 66, 20, 0.35)",
          };
        default:
          return {
            backgroundColor: "transparent",
          };
      }
    };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Photo captured:", photo.uri);
      // you can navigate to a preview screen, save photo, etc.

      router.push(`/theme-demo?photoUri=${encodeURIComponent(photo.uri)}`);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <CameraView style={{ flex: 1 }} ref={cameraRef} mode="picture"/>

      {/* Filter Overlay */}
      <View
        style={{
          ...getFilterStyle(),
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Filter Buttons ABOVE Capture */}
      <View
        style={{
          position: "absolute",
          bottom: 140, // moved up to avoid overlap
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingHorizontal: 20,
        }}
      >
        {["none", "gray", "sepia"].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={{
              backgroundColor:
                filter === f ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.4)",
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 12,
              borderWidth: filter === f ? 1 : 0,
              borderColor: "white",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {f === "none" ? "Normal" : f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Capture Button */}
      <View
        style={{
          position: "absolute",
          bottom: 40, // safely above Android navigation bar
          width: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={takePicture}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
            borderWidth: 6,
            borderColor: "rgba(255,255,255,0.4)",
          }}
        />
      </View>
    </View>
  );
}
