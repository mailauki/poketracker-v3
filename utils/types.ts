import { Key, ReactElement } from "react";

export interface Pokemon {
  entry_number: number,
  pokemon_species: {
    name: string,
    url: string
  }
}

export interface Dex {
  id: Key;
  title: string,
  game: string,
  type: string,
  shiny: boolean,
  username: string,
  pokemon: { number: string }[]
}

export interface DexProps {
  dex: Dex | null
}

export type Captured = { number: string }[]

export interface PokeProps {
  pokemon: Pokemon
  captured: Captured
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

export interface LinkButtonProps {
  label?: string
  href: string
  selected?: boolean
  value?: string
  icon?: ReactElement
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          // the data expected from .select()
          id: number
          username: string
          avatar_url: string
          data: Json | null
        }
        Insert: {
          // the data to be passed to .insert()
          id?: never // generated columns must not be supplied
          username: string // `not null` columns with no default must be supplied
          avatar_url?: string
          data?: Json | null // nullable columns can be omitted
        }
        Update: {
          // the data to be passed to .update()
          id?: never
          username?: string // `not null` columns are optional on .update()
          avatar_url?: string
          data?: Json | null
        }
      },
      pokedexes: {
        Row: {
          // the data expected from .select()
          id: number
          title: string
          game: string,
          type: string,
          shiny: boolean,
          username: string,
          pokemon: { number: string }[]
          data: Json | null
        }
        Insert: {
          // the data to be passed to .insert()
          id?: never // generated columns must not be supplied
          title: string // `not null` columns with no default must be supplied
          game?: string,
          type?: string,
          shiny?: boolean,
          username?: string,
          pokemon?: { number: string }[]
          data?: Json | null // nullable columns can be omitted
        }
        Update: {
          // the data to be passed to .update()
          id?: never
          title?: string // `not null` columns are optional on .update()
          game?: string,
          type?: string,
          shiny?: boolean,
          username?: string,
          pokemon?: { number: string }[]
          data?: Json | null
        }
      },
      pokemon: {
        Row: {
          // the data expected from .select()
          id: number
          number: string
          pokedex: Key
          data: Json | null
        }
        Insert: {
          // the data to be passed to .insert()
          id?: never // generated columns must not be supplied
          number: string // `not null` columns with no default must be supplied
          pokedex?: Key
          data?: Json | null // nullable columns can be omitted
        }
        Update: {
          // the data to be passed to .update()
          id?: never
          number?: string // `not null` columns are optional on .update()
          pokedex?: Key
          data?: Json | null
        }
      }
    }
  }
}