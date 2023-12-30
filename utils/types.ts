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

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      movies: {
        Row: {
          // the data expected from .select()
          id: number
          name: string
          data: Json | null
        }
        Insert: {
          // the data to be passed to .insert()
          id?: never // generated columns must not be supplied
          name: string // `not null` columns with no default must be supplied
          data?: Json | null // nullable columns can be omitted
        }
        Update: {
          // the data to be passed to .update()
          id?: never
          name?: string // `not null` columns are optional on .update()
          data?: Json | null
        }
      }
    }
  }
}