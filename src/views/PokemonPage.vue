<template>
    <section>
        <div v-if="pokemon" class="pokemon" :class="`background-${pokemon.types[0].type.name}`">
            <PokemonHeader />
            <div>
                <PokemonImage class="image" :pokemonImage="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" />
            </div>
            <div class="pokemon__content">
                <PokemonIdentification class="identification" :id="pokemon.id" :name="pokemon.name" />
                <PokemonTypes class="types" :types="pokemon.types.map(type => type.type.name)" />
                <PokemonInfos class="infos" :pokemon="pokemon" />
            </div>
        </div>
    </section>
</template>

<script>
import { api } from "@/services.js";
import PokemonHeader from "@/components/PokemonHeader.vue";
import PokemonImage from "@/components/PokemonImage.vue";
import PokemonIdentification from "@/components/PokemonIdentification.vue";
import PokemonTypes from "@/components/PokemonTypes.vue";
import PokemonInfos from "@/components/PokemonInfos.vue";

export default {
    name: "PokemonPage",
    components: {
        PokemonHeader,
        PokemonImage,
        PokemonIdentification,
        PokemonTypes,
        PokemonInfos,
    },
    props: ["id"],
    data() {
        return {
            pokemon: null,
        };
    },
    methods: {
        getPokemon() {
            const lowercaseId = this.id.toLowerCase();
            api.get(`/pokemon/${lowercaseId}`)
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
    min-height: 100vh;
    grid-template-rows: 50px 200px 1fr;
    &__content {
        background-color: #ffffff;
        border-radius: 80px 80px 0 0;
        box-shadow: 2px 2px 4px #d3d3d3;
        padding: 24px;
    }
}

@media (min-width: 1080px) {
    .pokemon {
        display: flex;
        align-items: center;
        justify-content: center;
        &__content {
            height: fit-content;
            padding: 60px;
            border-radius: 40px;
            box-shadow: none;
            margin: 0 40px;
        }
    }
}

@each $type, $color in $pokemon-colors {
  .background-#{$type} {
    background: linear-gradient(to bottom, rgba($color, 0.5), $color 40%);
  }
}
</style>