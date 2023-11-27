import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { styles } from './compraDeJogoStyle';

const ComprarDeJogos = () => {
  const [jogosLocaisSelecionados, setJogosLocaisSelecionados] = useState([]);
  const navigation = useNavigation();

  const handleExcluirJogo = (jogoId) => {
    try {
      if (typeof jogoId !== 'number' || jogoId <= 0) {
        throw new Error('O jogoId deve ser um número positivo válido.');
      }

      // Filtra os jogos para remover o jogo com o ID correspondente
      const updatedJogosSelecionados = jogosLocaisSelecionados.filter(
        (jogo) => jogo.id !== jogoId,
      );

      // Atualiza o estado local com os jogos atualizados
      setJogosLocaisSelecionados(updatedJogosSelecionados);

      console.log(`Jogo com ID ${jogoId} excluído com sucesso.`);
    } catch (error) {
      console.error('Erro ao excluir o jogo:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título do carrinho de compras */}
      <Text style={styles.title}>Carrinho de Compras</Text>

      {/* Container do carrinho de compras com imagem */}
      <View style={styles.carrinhoContainer}>
        <Image
          source={require('../../../assets/carrinhoIMG.png')}
          style={styles.carrinhoImage}
        />
      </View>

      {/* Lista de jogos no carrinho */}
      <FlatList
        data={jogosLocaisSelecionados}
        keyExtractor={(item) => item.cod.toString()}
        renderItem={({ item }) => (
          <View style={styles.jogoItem}>
            {/* Imagem do jogo */}
            <Image source={{ uri: item.urlImg}} style={styles.image} />

            {/* Informações do jogo */}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.item}</Text>
              <Text style={styles.price}>{item.value}</Text>
            </View>

            {/* Ícone de exclusão do jogo */}
            <TouchableOpacity onPress={() => handleExcluirJogo(item.cod)}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botões no final da tela */}
      <View style={styles.buttonsContainer}>
        {/* Botão para finalizar a compra */}
        <TouchableOpacity
          style={styles.finalizarButton}
          onPress={() => {
            navigation.navigate('FinalizarCompra', {
              jogosSelecionados: jogosLocaisSelecionados,
            });
          }}
        >
          <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>

        {/* Botão para continuar comprando */}
        <TouchableOpacity
          style={styles.continuarComprandoButton}
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.continuarComprandoButtonText}>
            Continuar Comprando
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ComprarDeJogos;
