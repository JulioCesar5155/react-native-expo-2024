import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/Auth';

export default function App() {
  const {signIn, signOut} = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo Pronto Para Usar </Text>
      <Button title='SignIn User' onPress={() => signIn({email: "user@email.com", password: "user123"})}/>
      <Button title='SignIn Adm' onPress={() => signIn({email: "adm@email.com", password: "adm123"})}/>
      <Button title='SignIn Super' onPress={() => signIn({email: "super@email.com", password: "super123"})}/>
      <Button title='SignOut'  onPress={() => signOut()}/>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: "bold",
    fontSize: 20,
  }
});
