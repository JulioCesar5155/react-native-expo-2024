import { StatusBar } from 'expo-status-bar';
import { BackHandler, Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';

export default function App() {
  const {signIn, signOut} = useAuth();

  const handleEntrarSuper = async () => {
    try {
      await signIn({email: "super@email.com", password: "A123456a!"});
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo Pronto Para Usar </Text>
      <Button title='SignIn User' onPress={handleEntrarSuper}/>
      <Button title='SignIn Adm' onPress={() => signIn({email: "adm@email.com", password: "adm123"})}/>
      <Button title='SignIn Super' onPress={() => signIn({email: "super@email.com", password: "super123"})}/>
      <Button title="Sobre" onPress={() => router.push("/about")}/>
      <Button title='Sair do Aplicativo' onPress={() => BackHandler.exitApp()}/>
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
    gap: 15,
  },
  title: {
    fontFamily: "bold",
    fontSize: 20,
  }
});
