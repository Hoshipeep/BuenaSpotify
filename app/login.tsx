import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';


export default function TabTwoScreen() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Spotify_logo_with_text.webp')} style={styles.logo} />
      <Text style={styles.subtext}>Music for everyone</Text>
      <TextInput placeholder="Username" style={styles.textinput} />
      <TextInput placeholder="Password" style={styles.textinput} secureTextEntry />
      <Text style={styles.forgotPassword}>Forgot your password?</Text>

      <TouchableOpacity style={[styles.socialButton, styles.loginButton]}
        onPress={() => navigation.navigate('(drawer)')}
      >
      <Text style={styles.loginText}>Login</Text>
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
        <Text style={styles.socialTextFacebook}>Login with Facebook</Text>
      </TouchableOpacity>

      {/* Google Login Button */}
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <Image
          source={require('@/assets/images/google.png')}
          style={styles.socialIcon}
        />
        <Text style={styles.socialTextGoogle}>Login with Google</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.subtext2}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#000',
  },

  subtext2: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
  },
  signUp: {
    color: '#1DB954',
    fontSize: 16,
    marginTop: 20,
    marginLeft: 8,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
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
  subtext: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    width: 300,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
  },
  textinput: {
    backgroundColor: '#333',
    width: 320,
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    color: '#1DB954',
    marginBottom: 20,
    textAlign: 'right',
    width: 300,
    fontWeight: 'bold',
    fontSize: 14,
  },
  logo: {
    width: 340,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '80%',
    justifyContent: 'center',
    position: 'relative',
    },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#3b5998',
    marginBottom: 10,
    },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    marginBottom: 10,
    },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 50,
    resizeMode: 'contain',
    position: 'absolute',
    left: 20,
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
    socialTextFacebook: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
        position: 'relative',
        marginLeft: 20,
        textAlign: 'center',
    },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
  },
  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#000',
    flexDirection: 'row',
  },
});
