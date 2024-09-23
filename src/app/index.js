import { StatusBar } from 'expo-status-bar';
import { BackHandler, Button, StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from'react';

export default function App() {
  const {signIn, signOut} = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState('A123456a!');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const handleEntrarSuper = async () => {
    try {
      await signIn({email, password});
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro ao entrar", error.message);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo Pronto Para Usar </Text>
      <View style={styles.inputbox}>
        <Ionicons name="mail-open-outline" size={20} color="black"/>
        <TextInput style={styles.emailinput} placeholder="E-mail" value={email} onChangeText={setEmail}/>
      </View>

      <View style={styles.inputbox}>
        <Ionicons name="lock-closed-outline" size={20} color="black"/>
        <TextInput style={styles.emailinput} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry={passwordVisible}/>
        
        <Ionicons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="black" style={{position: 'absolute', right: 10}} onPress={togglePasswordVisibility}/>
      </View>
      
      <Button title='Entrar' onPress={handleEntrarSuper}/>
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
  },
  inputbox: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center',
  },
  emailinput: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 30,
  },
});
