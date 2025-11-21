export interface Song {
  id: string;
  name: string;
}

export interface PlaylistState {
  past: Song[][];
  present: Song[];
  future: Song[][];
}

export type PlaylistAction =
  | { type: "SET"; payload: PlaylistState }
  | { type: "ADD"; payload: Song }
  | { type: "REMOVE"; payload: string }
  | { type: "CLEAR" }
  | { type: "UNDO" }
  | { type: "REDO" };
