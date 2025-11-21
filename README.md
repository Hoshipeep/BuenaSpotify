Week 1 - 2 UI of Spotify On Click of Signup leads to Signup UI

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/0ef3100f-8828-4d17-9dd3-fdde1293dac7" />
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/eacfb958-aead-47d9-98d7-c14cf61ee8ee" />

Week 3
In this activity, gestures were implemented to enhance navigation, including swipe-to-open/close drawer functionality and tap-to-select on playlist items. Custom transitions were added for stack navigation: a 300ms slide animation for Profile and Settings screens and a 200ms fade animation for the Sign-up screen. The drawer also features a smooth scale animation using react-native-reanimated. Navigation persistence was achieved using AsyncStorage, restoring the last visited screen and drawer state upon app launch. Testing on the Android emulator confirmed smooth gesture interactions, seamless transitions, and reliable state restoration.

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/1c485a15-9b90-4c0f-98f0-a2401ea5de02" />
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/1112374b-3843-42c7-889c-05652f217c80" />
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/f1eb1e80-39ad-4382-afb8-6548ae2a46f8" />
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/287138f9-ab10-4e9e-8c33-9b46b12879ba" />


Week 4 Activity 1

The Spotify Playlist Builder app uses useState and useReducer to manage playlist state, including adding, removing, and clearing songs while maintaining a history for undo/redo functionality. Animations were implemented with react-native-reanimated to provide smooth transitions when songs are added or removed. AsyncStorage is used for persistence, saving the playlist and history so the app restores correctly on reload. Testing confirmed consistent behavior, smooth animations, and correct state restoration across app restarts.

Week 4 Activity 2

The Spotify Profile Creation Form validates inputs in real-time: usernames must be 3–20 alphanumeric characters, emails follow standard format, and genres are selected from a predefined list. Invalid inputs trigger a shake animation, and error messages and the profile preview fade in smoothly using react-native-reanimated. The dynamic profile preview updates instantly as users type, displaying the username, email, and genre with a genre-specific placeholder image. Performance is optimized with React.memo, and AsyncStorage caches form data for auto-fill on reload, clearing upon successful submission.

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/68eadb4d-f6dd-418b-8d5c-2f8c82ed51cd" />
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/5b384d99-eb17-478c-b326-63a3d23c9a2e" />
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/fc499bd5-4e91-43ec-82d2-0856805f90eb" />

Week 5 Activity 1

The Week 2 Spotify app was enhanced with a theme toggle using Redux Toolkit to manage light, dark, and custom themes. Theme transitions were animated with react-native-reanimated, allowing smooth color interpolations when switching themes. Users can select from preset themes or customize accent colors via a color picker, and all settings are persisted using AsyncStorage so the chosen theme restores automatically on app reload. Testing confirmed seamless UI updates and consistent theme persistence across screens.

Week 5 Activity 2

The camera feature uses expo-camera to capture photos with a live preview, while grayscale and sepia filters can be applied in real-time. Users can adjust filter intensity via sliders, and editing tools such as crop and rotate are available to refine photos before saving locally. React.memo optimizations ensured smooth performance during filter application and preview updates. Testing confirmed accurate filter effects, responsive UI, and stable camera operation across Android and iOS devices.

<img width="353" height="803" alt="image" src="https://github.com/user-attachments/assets/1381e41b-c081-4353-803f-eeca8e3ad0a3" />
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/acad24dd-27b6-4a84-87f5-057f9a0bae20" />

Week 6 Activity 2

The app was enhanced to display the user’s real-time location on a map using react-native-geolocation-service and react-native-maps. Three mock points of interest were added as custom markers with geofencing, triggering alerts when entering a 100-meter radius. Zoom and pan controls improved map interactivity, and a dark-themed map style was applied for visual enhancement. Testing confirmed smooth location updates, responsive map controls, and accurate geofence alerts across Android and iOS devices, though configuring permissions and ensuring stable location tracking required careful setup.

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/acad24dd-27b6-4a84-87f5-057f9a0bae20" />







