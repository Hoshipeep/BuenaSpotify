import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000', // Black drawer background
        },
        drawerActiveTintColor: '#1DB954', // Spotify green for active items
        drawerInactiveTintColor: '#fff',  // White for inactive items
        headerStyle: {
          backgroundColor: '#000', // Black header in drawer screens
        },
        headerTintColor: '#fff', // White header text/icons
      }}
    >
      <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
      <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
      <Drawer.Screen name="PlaylistBuilder" options={{ title: 'Songs' }} />
      <Drawer.Screen name="ProfileCreationForm" options={{ title: 'Create Profile' }} />
      <Drawer.Screen name="theme-demo" options={{ title: 'Theme Demo' }} />
      <Drawer.Screen name="camera-demo" options={{ title: 'Camera Demo'}} />
      <Drawer.Screen name="map" options={{ title: 'Map Demo'}} />
    </Drawer>
  );
}
