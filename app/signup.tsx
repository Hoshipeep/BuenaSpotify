import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function TabTwoScreen() {
  const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Spotify_logo_with_text.webp')} style={styles.logo} />
      <Text style={styles.signUpText}>Sign Up</Text>

      <TextInput placeholder="Email" style={styles.textinput} />
      <TextInput placeholder="Password" style={styles.textinput} secureTextEntry />
      <TextInput placeholder="Confirm Password" style={styles.textinput} secureTextEntry />

      <View style={styles.dobContainer}>
        <Text style={styles.dobLabel}>Date of Birth</Text>
        <TextInput placeholder="MM" style={styles.dobInput} keyboardType="numeric" maxLength={2} />
        <TextInput placeholder="DD" style={styles.dobInput} keyboardType="numeric" maxLength={2} />
        <TextInput placeholder="YYYY" style={styles.dobYearInput} keyboardType="numeric" maxLength={4} />
      </View>

      <View style={styles.radioGroup}>
        {['male', 'female', 'other'].map((option) => (
          <View key={option} style={styles.radioItem}>
            <RadioButton
              value={option}
              status={gender === option ? 'checked' : 'unchecked'}
              onPress={() => setGender(option as 'male' | 'female' | 'other')}
              color="#1DB954"
              uncheckedColor="#fff"
            />
            <Text style={styles.radioLabel}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.socialButton, styles.signUpButton]}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.separator} />
      </View>

      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <Image
          source={require('@/assets/images/Facebook_icon.png')}
          style={styles.socialIcon}
        />
        <Text style={styles.socialTextFacebook}>Sign Up with Facebook</Text>
      </TouchableOpacity>

      {/* Google Login Button */}
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <Image
          source={require('@/assets/images/google.png')}
          style={styles.socialIcon}
        />
        <Text style={styles.socialTextGoogle}>Sign Up with Google</Text>
      </TouchableOpacity>


    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  signUpText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  textinput: {
    width: '80%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    marginBottom: 15,
  },
  dobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  dobLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 8,
    width: '30%',
  },
  dobInput: {
    width: '19%',
    height: 38,
    backgroundColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    marginRight: 5,
  },
  dobYearInput: {
    width: '22%',
    height: 38,
    backgroundColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
  },
  radioGroup: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  radioLabel: {
    color: '#fff',
    fontSize: 16,
  },
  socialButton: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButton: {
    backgroundColor: '#1DB954',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
    separatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      width: 300,
      backgroundColor: '#000',
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#fff',
    },
    orText: {
      color: '#fff',
      fontSize: 16,
      marginHorizontal: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Helvetica Neue',
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 50,
        resizeMode: 'contain',
        position: 'absolute',
        resizeMode: 'contain',
        left: 25,
    },
    socialTextFacebook: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
        position: 'relative',
        marginLeft: 20,
        textAlign: 'center',

    },
    facebookButton: {
        backgroundColor: '#1877F2',
    },
    googleButton: {
        backgroundColor: '#fff',
    },
    socialButton: {
        flexDirection: 'row',
        width: '80%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    socialTextGoogle: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
        position: 'relative',
        marginLeft: 10,
        textAlign: 'center',
    },

});
