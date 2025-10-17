import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../constants/Colors';

export default function ModalScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();// pega o nome do Pokémon pela URL
  const router = useRouter();// pra voltar depois
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
// Busca o Pokémon na API
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error('Pokémon não encontrado');
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError('Erro ao buscar Pokémon');
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [name]);
 // Enquanto carrega
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.text} size="large" />
        <Text style={{ color: Colors.text }}>Carregando...</Text>
      </View>
    );
  }
 // Se der erro
  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error || 'Pokémon não encontrado'}</Text>
        <Button title="Voltar" color={Colors.accent} onPress={() => router.back()} />
      </View>
    );
  }
// Pega a imagem do Pokémon
  const image =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Text style={styles.subtitle}>Tipos:</Text>
      <Text style={styles.info}>{pokemon.types.map((t: any) => t.type.name).join(', ')}</Text>

      <Text style={styles.subtitle}>Habilidades:</Text>
      <Text style={styles.info}>{pokemon.abilities.map((a: any) => a.ability.name).join(', ')}</Text>

      <Text style={styles.subtitle}>Stats:</Text>
      {pokemon.stats.map((s: any) => (
        <Text key={s.stat.name} style={styles.info}>
          {s.stat.name}: {s.base_stat}
        </Text>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Voltar" color={Colors.accent} onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: 'bold',
    marginTop: 12,
  },
  info: {
    fontSize: 16,
    color: Colors.text,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginBottom: 10,
  },
});
