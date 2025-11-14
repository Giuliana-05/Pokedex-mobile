import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api";

export function useFetchPokemon(search?: string) {
  return useQuery({
    queryKey: ["pokemon", search],
    queryFn: async () => {
      // Se está buscando um Pokémon específico
      if (search && search.trim().length > 0) {
        const cleanedSearch = search.trim().toLowerCase();

        try {
          const res = await api.get(`/pokemon/${cleanedSearch}`);
          return [
            {
              name: res.data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${cleanedSearch}`
            }
          ];
        } catch (error) {
          return []; // importantíssimo para não quebrar o app
        }
      }

      const res = await api.get("/pokemon?limit=2000");
      return res.data.results;
    }
  });
}
