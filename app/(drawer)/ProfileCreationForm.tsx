// app/(drawer)/ProfileCreationForm.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type Genre = "Pop" | "Rock" | "Jazz" | "Classical" | "Hip-Hop" | "";

const STORAGE_KEY = "@profile_form_v1";
const GENRES: Genre[] = ["Pop", "Rock", "Jazz", "Classical", "Hip-Hop"];

function validateUsername(v: string) {
  const re = /^[A-Za-z0-9_]{3,20}$/;
  if (!v) return "Username is required.";
  if (!re.test(v)) return "3–20 chars. Letters, numbers, underscores only.";
  return "";
}

function validateEmail(v: string) {
  if (!v) return "Email is required.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(v)) return "Enter a valid email address.";
  return "";
}

function validateGenre(v: Genre) {
  if (!v) return "Choose a genre.";
  return "";
}

/* Memoized preview */
const ProfilePreview = React.memo(function ProfilePreview({
  username,
  email,
  genre,
  visible,
}: {
  username: string;
  email: string;
  genre: Genre;
  visible: boolean;
}) {
  const fade = useSharedValue(0);

  useEffect(() => {
    fade.value = visible ? withTiming(1, { duration: 350 }) : withTiming(0, { duration: 180 });
  }, [visible, fade]);

  const aStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: 8 * (1 - fade.value) }],
  }));

  const imageUrl =
    genre && genre.length > 0
      ? `https://via.placeholder.com/100?text=${encodeURIComponent(genre)}`
      : `https://via.placeholder.com/100?text=Profile`;

  return (
    <Animated.View style={[styles.previewCard, aStyle]}>
      <Image source={{ uri: imageUrl }} style={styles.previewImage} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.previewName}>{username || "Username"}</Text>
        <Text style={styles.previewEmail}>{email || "email@example.com"}</Text>
        <Text style={styles.previewGenre}>{genre || "No genre selected"}</Text>
      </View>
    </Animated.View>
  );
});
ProfilePreview.displayName = "ProfilePreview";

export default function ProfileCreationForm() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [genre, setGenre] = useState<Genre>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [genreError, setGenreError] = useState<string>("");

  // shake shared values
  const shakeUsername = useSharedValue(0);
  const shakeEmail = useSharedValue(0);
  const shakeGenre = useSharedValue(0);

  // error fade shared values
  const usernameErrFade = useSharedValue(0);
  const emailErrFade = useSharedValue(0);
  const genreErrFade = useSharedValue(0);

  // Load cached values
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setUsername(parsed.username ?? "");
          setEmail(parsed.email ?? "");
          setGenre(parsed.genre ?? "");
        }
      } catch (e) {
        console.warn("Load cache failed", e);
      }
    })();
  }, []);

  // Save cache whenever changed
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ username, email, genre }));
      } catch (e) {
        console.warn("Save cache failed", e);
      }
    })();
  }, [username, email, genre]);

  // real-time validation effects
  useEffect(() => {
    const msg = validateUsername(username);
    setUsernameError(msg);
    usernameErrFade.value = msg ? withTiming(1, { duration: 220 }) : withTiming(0, { duration: 180 });
  }, [username, usernameErrFade]);

  useEffect(() => {
    const msg = validateEmail(email);
    setEmailError(msg);
    emailErrFade.value = msg ? withTiming(1, { duration: 220 }) : withTiming(0, { duration: 180 });
  }, [email, emailErrFade]);

  useEffect(() => {
    const msg = validateGenre(genre);
    setGenreError(msg);
    genreErrFade.value = msg ? withTiming(1, { duration: 220 }) : withTiming(0, { duration: 180 });
  }, [genre, genreErrFade]);

  // animated styles
  const usernameAnimStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shakeUsername.value }] }));
  const emailAnimStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shakeEmail.value }] }));
  const genreAnimStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shakeGenre.value }] }));

  const triggerShake = useCallback((sharedVal: Animated.SharedValue<number>) => {
    sharedVal.value = withSequence(
      withTiming(-8, { duration: 60 }),
      withTiming(8, { duration: 60 }),
      withTiming(-6, { duration: 50 }),
      withTiming(6, { duration: 50 }),
      withTiming(0, { duration: 80 })
    );
  }, []);

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    const uErr = validateUsername(username);
    const eErr = validateEmail(email);
    const gErr = validateGenre(genre);

    setUsernameError(uErr);
    setEmailError(eErr);
    setGenreError(gErr);

    if (uErr) triggerShake(shakeUsername);
    if (eErr) triggerShake(shakeEmail);
    if (gErr) triggerShake(shakeGenre);

    if (!uErr && !eErr && !gErr) {
      Alert.alert("Profile Saved", "Form validated successfully. Cache cleared.");
      (async () => {
        try {
          await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (e) {
          console.warn("Clear cache failed", e);
        }
      })();
      setUsername("");
      setEmail("");
      setGenre("");
    }
  }, [username, email, genre, triggerShake, shakeUsername, shakeEmail, shakeGenre]);

  const ErrorText: React.FC<{ text: string; fade: Animated.SharedValue<number> }> = ({ text, fade }) => {
    const aStyle = useAnimatedStyle(() => ({ opacity: fade.value, transform: [{ translateY: (1 - fade.value) * 6 }] }));
    if (!text) return null;
    return <Animated.Text style={[styles.errorText, aStyle]}>{text}</Animated.Text>;
  };

  const previewVisible = !!(username || email || genre);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Create Profile</Text>

        <Animated.View style={[styles.fieldWrapper, usernameAnimStyle]}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="3–20 chars, letters/numbers/_"
            placeholderTextColor="#777"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <ErrorText text={usernameError} fade={usernameErrFade} />
        </Animated.View>

        <Animated.View style={[styles.fieldWrapper, emailAnimStyle]}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#777"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <ErrorText text={emailError} fade={emailErrFade} />
        </Animated.View>

        <Animated.View style={[styles.fieldWrapper, genreAnimStyle]}>
          <Text style={styles.label}>Favorite Genre</Text>
          <View style={styles.genreRow}>
            {GENRES.map((g) => {
              const selected = g === genre;
              return (
                <TouchableOpacity
                  key={g}
                  onPress={() => setGenre(g as Genre)}
                  style={[styles.genreBtn, selected && styles.genreBtnSelected]}
                >
                  <Text style={[styles.genreText, selected && styles.genreTextSelected]}>{g}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <ErrorText text={genreError} fade={genreErrFade} />
        </Animated.View>

        <Text style={[styles.sectionTitle, { marginTop: 6 }]}>Live Preview</Text>
        <ProfilePreview username={username} email={email} genre={genre} visible={previewVisible} />

        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearBtn}
            onPress={async () => {
              await AsyncStorage.removeItem(STORAGE_KEY);
              setUsername("");
              setEmail("");
              setGenre("");
              Alert.alert("Cleared", "Cache cleared and form reset.");
            }}
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: Platform.select({ ios: 80, android: 40 }) }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 28,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
  },
  fieldWrapper: {
    marginBottom: 12,
  },
  label: {
    color: "#ddd",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    color: "#ff6b6b",
    marginTop: 8,
    fontSize: 13,
  },
  genreRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  genreBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    marginRight: 8,
    marginBottom: 8,
  },
  genreBtnSelected: {
    backgroundColor: "#1DB954",
    borderColor: "#1DB954",
  },
  genreText: {
    color: "#ddd",
    fontWeight: "600",
  },
  genreTextSelected: {
    color: "#000",
  },
  sectionTitle: {
    color: "#fff",
    marginTop: 12,
    marginBottom: 8,
    fontWeight: "700",
  },
  previewCard: {
    backgroundColor: "#0f0f0f",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  previewImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#222",
  },
  previewName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  previewEmail: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 4,
  },
  previewGenre: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitBtn: {
    flex: 1,
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#000",
    fontWeight: "700",
  },
  clearBtn: {
    width: 110,
    backgroundColor: "#222",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  clearText: {
    color: "#fff",
    fontWeight: "700",
  },
});
