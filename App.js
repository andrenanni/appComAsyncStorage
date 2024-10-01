import { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
const [nome, setNome] = useState('')
const [nomeArmazenado, setNomeArmazenado] = useState('')

const salvarNome = async () =>{
  try {
    await AsyncStorage.setItem('@nome_usuario', nome)
    alert('Nome salvo com sucesso!')
    carregarDados()
  } catch (error) {
    console.log(error);
  }
}

const carregarDados = async () =>{
  try {
    const valor = await AsyncStorage.getItem('@nome_usuario')
    if(valor != null){
      setNomeArmazenado(valor)
    }
  } catch (error) {
    console.log(error);
  }
}

// Carregar o ultimo nome ao carregar o App
useEffect(
  () => {carregarDados()}, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>Nome armazenado: {nomeArmazenado}</Text>
        <TextInput
        placeholder='Digite seu nome'
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        ></TextInput>
        <Button title='Salvar nome' onPress={salvarNome}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10
  }
});
