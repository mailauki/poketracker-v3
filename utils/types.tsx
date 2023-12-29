export interface Pokemon {
  entry_number: number,
  pokemon_species: {
    name: string,
    url: string
  }
}

export interface PokeProps {
  pokemon: Pokemon;
}

export interface Sprites {
  back_default: string | null,
  back_female: string | null,
  back_shiny: string | null,
  back_shiny_female: string | null,
  front_default: string,
  front_female: string | null,
  front_shiny: string | null,
  front_shiny_female: string | null
}

export interface Game {
  name: string,
  url: string
}

export interface Pokedex {
  name: string,
  url: string
}