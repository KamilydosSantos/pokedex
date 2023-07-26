<template>
    <section>
        <div v-if="pokemon" class="pokemon" :class="`background-${pokemon.types[0].type.name}`">
            <PokemonHeader />
            <PokemonImage  :pokemonImage="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" />
            <PokemonContent :pokemon="pokemon" />
        </div>
    </section>
</template>

<script>
import { api } from "@/services.js";
import PokemonHeader from "@/components/PokemonHeader.vue";
import PokemonImage from "@/components/PokemonImage.vue";
import PokemonContent from "@/components/PokemonContent.vue";

export default {
    name: "PokemonPage",
    components: {
        PokemonHeader,
        PokemonImage,
        PokemonContent,
    },
    props: ["id"],
    data() {
        return {
            pokemon: null,
        };
    },
    methods: {
        getPokemon() {
            api.get(`/pokemon/${this.id}`)
            .then(response => {
                this.pokemon = response.data;
            });
        },
    },
    created() {
        this.getPokemon();
    },
}
</script>

<style lang="scss" scoped>
$pokemon-colors: (
  "normal": #AF8545,
  "flying": #196C72,
  "fire": #C62C2C,
  "fighting": #E38E0F,
  "poison": #8B11C5,
  "ground": #884E18,
  "rock": #6A625F,
  "bug": #2F812D,
  "ghost": #2C0892,
  "steel": #3D6488,
  "water": #1179C5,
  "grass": #6B9511,
  "electric": #CD9E15,
  "psychic": #960F70,
  "ice": #15C8D3,
  "dragon": #DE4C0D,
  "dark": #353348,
  "fairy": #E45C8D,
  "unknown": #000000,
  "shadow": #5A2679
);
.pokemon {
    display: grid;
    grid-template-rows: 50px 200px 1fr;
    height: 100vh;
}
@each $type, $color in $pokemon-colors {
  .background-#{$type} {
    background: linear-gradient(to bottom, rgba($color, 0.5), $color 40%);
  }
}
</style>