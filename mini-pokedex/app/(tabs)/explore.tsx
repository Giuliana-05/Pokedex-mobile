import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Pokédex</Text>
      <Text style={styles.text}>
        Projeto feito com 💗 usando Expo + React Native.
      </Text>
      <Text style={styles.text}>
        Tema: Rosa bebê e branco 🎀
      </Text>
      <Text style={styles.text}>
        Desenvolvido para estudos de TypeScript, consumo de API e navegação.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginVertical: 4,
  },
});