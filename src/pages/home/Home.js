import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './homeStyle.js';
import axios from 'axios';

const Header = ({ userName }) => (
  <View style={styles.header}>
    <Image
      source={require('../../../assets/userImage.jpg')}
      style={styles.userImage}
    />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{`Olá, ${userName}!`}</Text>
      <Text style={styles.userQuote}>Hoje é dia de vitória!</Text>
    </View>
  </View>
);

const Home = () => {
  const navigation = useNavigation();
  const [carrinho, setCarrinho] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://192.168.1.8:8000/employee/Product');
        console.log('Response data:', response.data); // Adicione este log
        setEmployees(response.data);
        console.log('Employees state:', employees); // Adicione este log
      } catch (error) {
        console.error('Erro ao obter a lista de jogos:', error);
      }
    };
  
    fetchEmployees();
  }, []);

  const adicionarAoCarrinho = (productId) => {
    const jogoNoCarrinho = carrinho.find(
      (jogoCarrinho) => jogoCarrinho.item === productId.item,
    );

    if (jogoNoCarrinho) {
      setPopupMessage(`O jogo ${productId.item} já está no carrinho.`);
    } else {
      setCarrinho([...carrinho, productId.item]);
      setPopupMessage(`Jogo ${productId.item} adicionado ao carrinho.`);
    }

    setShowPopup(true);
  };

  const navigateToAddGame = () => {
    navigation.navigate('AdicionarJogo');
  };

  const navigateToCart = () => {
    navigation.navigate('CompraDeJogo', { jogosSelecionados: carrinho });
  };

  const navigateToMyPurchases = () => {
    navigation.navigate('MinhasCompras');
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closePopup();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [showPopup]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header userName="Davi" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { marginRight: 10, width: 120, height: 40 },
              ]}
              onPress={navigateToAddGame}
            >
              <Text style={styles.buttonText}>Adicionar Jogo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { marginRight: 10, width: 120, height: 40 },
              ]}
              onPress={navigateToCart}
            >
              <Text style={styles.buttonText}>Carrinho</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { marginRight: 10, width: 120, height: 40 },
              ]}
              onPress={navigateToMyPurchases}
            >
              <Text style={styles.buttonText}>MinhasCompras</Text>
            </TouchableOpacity>
            {/* Adicione outros botões aqui... */}
          </View>
        </ScrollView>
        <View style={styles.lastReleasesContainer}>
          <Text style={styles.sectionTitle}>Últimas Novidades</Text>
          <View>
          {employees.map((employee) => (
  <View key={employee.cod} style={styles.gameItem}>
    <Image source={{ uri: employee.urlImg }} style={styles.gameImage} />
    <View style={styles.gameDetails}>
      <View style={styles.gameInfo}>
        <Text style={styles.gameName}>{employee.item}</Text>
        <Text style={styles.gamePrice}> R$ {employee.value},00 </Text>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          if (
            !carrinho.find(
              (jogoCarrinho) => jogoCarrinho.item === employee.item,
            )
          ) {
            adicionarAoCarrinho(employee);
          }
        }}
      >
        <Text style={styles.addToCartButtonText}>
          Adicionar ao Carrinho
        </Text>
      </TouchableOpacity>
    </View>
  </View>
))}
</View>
        </View>
        {showPopup && (
          <Modal
            transparent={true}
            visible={showPopup}
            animationType="slide"
            onRequestClose={closePopup}
          >
            <View style={styles.popupContainer}>
              <View style={styles.popupContent}>
                <Text style={styles.popupText}>{popupMessage}</Text>
                <TouchableOpacity onPress={closePopup}></TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
