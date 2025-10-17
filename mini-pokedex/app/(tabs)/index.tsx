import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import PokemonCard from '../../components/PokemonCard';
import { useFetchPokemon } from '../../hooks/useFetchPokemon';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  // Hook que busca a lista de Pokémons da API
  const { pokemonList, loading, error } = useFetchPokemon();
  const router = useRouter();// usado pra navegar pro modal

  if (loading) {// Enquanto carrega, mostra indicador
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.text} size="large" />
        <Text style={{ color: Colors.text }}>Carregando Pokémons...</Text>
      </View>
    );
  }
 // Se der erro na API
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }
 // Mostra a lista dos Pokémons
  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            onPress={() => router.push(`/modal?name=${item.name}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});
