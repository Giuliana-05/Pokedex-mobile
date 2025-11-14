import React, { useState } from "react";
import { View, FlatList, TextInput, ActivityIndicator, Text, StyleSheet } from "react-native";
import PokemonCard from "../../components/PokemonCard";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useFetchPokemon } from "../../hooks/useFetchPokemon";

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data: pokemonList, isLoading, error } = useFetchPokemon(search);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Pokémon..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {isLoading && <ActivityIndicator color={Colors.text} size="large" />}
      {error && <Text style={{ color: "red" }}>Pokémon não encontrado.</Text>}

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
    padding: 12,
  },
  input: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
});
