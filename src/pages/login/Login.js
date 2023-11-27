import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { styles } from './loginStyle.js';
import axios from 'axios';

function Login({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const sendForm = async () => {
    try {
      if (!name || !password) {
        // Verifica se os campos estão preenchidos
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }

      const response = await axios.post('http://192.168.1.8:8000/user/login', {
        name,
        password
      });

      console.log(response.data); // Assume que a resposta contém dados

      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);

      if (axios.isAxiosError(error)) {
        // Verifica se é um erro do Axios
        const errorMessage = error.response?.data?.message || 'Erro desconhecido';
        Alert.alert('Erro', errorMessage);
      } else {
        Alert.alert('Erro', 'Erro desconhecido');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/union.png')} style={styles.containerImage} />

      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/BGLOGO.png')} style={styles.logoImage} />
          <View style={styles.divider} />
          <Text style={styles.loginTitle}>Faça seu login</Text>
        </View>

        <TextInput
          style={[styles.input, { color: '#DDE3F0' }]}
          placeholder="Nome de usuário"
          onChangeText={text => setName(text)}
          placeholderTextColor="#DDE3F0"
        />

        <TextInput
          style={[styles.input, { color: '#DDE3F0' }]}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          placeholderTextColor="#DDE3F0"
        />

        <TouchableOpacity style={styles.button} onPress={sendForm}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <Text style={styles.registerButtonText}>Não tem uma conta? Registre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
