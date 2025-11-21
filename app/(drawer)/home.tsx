import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet } from 'react-native';

export default function TabOneScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Playlists</Text>

        <View style={styles.playlistItem}>
        <Image source={require('@/assets/images/dec_ave.jpg')} style={styles.playlistImg} />
        <Text style={styles.playlist}>OPM</Text>
        </View>

        <View style={styles.playlistItem}>
        <Image source={require('@/assets/images/kano.jpg')} style={styles.playlistImg} />
        <Text style={styles.playlist}>Weird</Text>
        </View>

        <View style={styles.playlistItem}>
        <Image source={require('@/assets/images/alie_gatie.jpg')} style={styles.playlistImg} />
        <Text style={styles.playlist}>Day</Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'space-between', // pushes content up and logout down
  },
  content: {
    marginTop: 40,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  playlist: {
    fontSize: 21,
    color: '#fff',
    marginVertical: 10,
    fontWeight: 675,
    fontFamily: 'Helvetica Neue',
  },
  playlistImg: {
    width: 75,
    height: 72,
    borderRadius: 8,
    marginRight: 15,
  },
  logoutButton: {
    alignSelf: 'center',
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#000',
  },

});
