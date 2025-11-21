import { PlaylistState, PlaylistAction } from "./playlistTypes";

export const playlistInitialState: PlaylistState = {
  past: [],
  present: [],
  future: [],
};

export function playlistReducer(
  state: PlaylistState,
  action: PlaylistAction
): PlaylistState {
  const { past, present, future } = state;

  switch (action.type) {
    case "SET":
      return action.payload;

    case "ADD":
      return {
        past: [...past, present],
        present: [...present, action.payload],
        future: [],
      };

    case "REMOVE":
      return {
        past: [...past, present],
        present: present.filter((s) => s.id !== action.payload),
        future: [],
      };

    case "CLEAR":
      return {
        past: [...past, present],
        present: [],
        future: [],
      };

    case "UNDO":
      if (past.length === 0) return state;
      return {
        past: past.slice(0, -1),
        present: past[past.length - 1],
        future: [present, ...future],
      };

    case "REDO":
      if (future.length === 0) return state;
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      };

    default:
      return state;
  }
}
