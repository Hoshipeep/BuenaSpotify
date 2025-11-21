import { Ionicons } from '@expo/vector-icons'; // ✅ correct import for Expo
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      {/* Settings Title */}
      <View style={styles.sectionTitle}>
        <Ionicons name="settings-sharp" size={28} color="#00C853" />
        <Text style={styles.sectionText}>Settings</Text>
      </View>

      {/* Notification Toggle */}
      <View style={styles.settingBox}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#444', true: '#00C853' }}
          thumbColor={notificationsEnabled ? '#00C853' : '#aaa'}
        />
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.settingBox}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: '#444', true: '#00C853' }}
          thumbColor={darkModeEnabled ? '#00C853' : '#aaa'}
        />
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  settingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#00C853',
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 40,
    width: '90%',
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
