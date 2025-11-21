import React, { useEffect, useReducer, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { Layout, FadeInRight, FadeOutLeft } from "react-native-reanimated";
import uuid from "react-native-uuid";


import { playlistReducer, playlistInitialState } from "@/playlist/playlistSlice";
import { Song } from "@/playlist/playlistTypes";

export default function PlaylistBuilder() {
  const [state, dispatch] = useReducer(playlistReducer, playlistInitialState);
  const [song, setSong] = useState("");

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("playlistData");
      if (saved) {
        dispatch({ type: "SET", payload: JSON.parse(saved) });
      }
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("playlistData", JSON.stringify(state));
  }, [state]);

  const addSong = () => {
    if (!song.trim()) return;

    const newSong: Song = {
      id: uuid.v4() as string,
      name: song.trim(),
    };


    dispatch({ type: "ADD", payload: newSong });
    setSong("");
    Keyboard.dismiss();
  };

  const removeSong = useCallback((id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* your UI unchanged */}
        <Text style={styles.header}>Songs</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={song}
            placeholder="Enter song name"
            placeholderTextColor="#888"
            onChangeText={setSong}
          />
          <TouchableOpacity style={styles.addButton} onPress={addSong}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={() => dispatch({ type: "UNDO" })} style={styles.actionBtn}>
            <Text style={styles.actionText}>Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => dispatch({ type: "REDO" })} style={styles.actionBtn}>
            <Text style={styles.actionText}>Redo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => dispatch({ type: "CLEAR" })} style={styles.clearBtn}>
            <Text style={styles.actionText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={state.present}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Animated.View
              entering={FadeInRight.springify()}
              exiting={FadeOutLeft.springify()}
              layout={Layout.springify()}
              style={styles.songItem}
            >
              <Text style={styles.songText}>{item.name}</Text>

              <TouchableOpacity onPress={() => removeSong(item.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    backgroundColor: "#111",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#1db954",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  actionBtn: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  clearBtn: {
    backgroundColor: "#b00020",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  songItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },

  songText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },

  removeText: {
    color: "#ff5252",
    fontWeight: "600",
    marginLeft: 10,
  },
});

