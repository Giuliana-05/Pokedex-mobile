import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { api } from "../service/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../constants/Colors";

export default function ModalScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokemon() {
      try {
        const res = await api.get(`/pokemon/${name}`);
        setPokemon(res.data);
      } finally {
        setLoading(false);
      }
    }

    getPokemon();
  }, [name]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.text} />
      </View>
    );

  const image =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon?.sprites?.front_default;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pokemon.name}</Text>

      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.subtitle}>Tipos:</Text>
      <Text style={styles.info}>{pokemon.types.map((t: { type: { name: any; }; }) => t.type.name).join(", ")}</Text>

      <Text style={styles.subtitle}>Habilidades:</Text>
      <Text style={styles.info}>{pokemon.abilities.map((a: { ability: { name: any; }; }) => a.ability.name).join(", ")}</Text>

      <Button title="Voltar" color={Colors.accent} onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: "bold",
    color: Colors.text,
  },
  info: {
    color: Colors.text,
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
