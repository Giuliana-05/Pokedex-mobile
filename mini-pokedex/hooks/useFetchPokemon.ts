import { useEffect, useState } from 'react';

export function useFetchPokemon() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await res.json();
        setPokemonList(data.results);
      } catch (err) {
        setError('Erro ao carregar Pokémons');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { pokemonList, loading, error };
}
