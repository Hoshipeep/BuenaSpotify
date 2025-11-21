import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { MapView, Marker, Circle } from "expo-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

  const pointsOfInterest = [
    { id: 1, title: "Checkpoint A", latitude: 14.5995, longitude: 120.9842 },
    { id: 2, title: "Checkpoint B", latitude: 14.6005, longitude: 120.986 },
    { id: 3, title: "Checkpoint C", latitude: 14.5982, longitude: 120.9871 },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(pos.coords);

          // geofencing
          pointsOfInterest.forEach((poi) => {
            const d = getDistance(latitude, longitude, poi.latitude, poi.longitude);
            if (d < 100) {
              Alert.alert("Geofence Alert", `You're near ${poi.title}`);
            }
          });
        }
      );
    })();
  }, []);

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location?.latitude ?? 14.5995,
          longitude: location?.longitude ?? 120.9842,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        customMapStyle={darkMapStyle}
      >
        {pointsOfInterest.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={{ latitude: poi.latitude, longitude: poi.longitude }}
            title={poi.title}
          />
        ))}

        {pointsOfInterest.map((poi) => (
          <Circle
            key={`c-${poi.id}`}
            center={{ latitude: poi.latitude, longitude: poi.longitude }}
            radius={100}
            color="rgba(29,185,84,0.25)"
            strokeColor="rgba(29,185,84,0.9)"
          />
        ))}
      </MapView>
    </View>
  );
}

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1d1d1d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8e8e8e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1d1d1d" }] },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
];
