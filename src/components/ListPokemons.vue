<template>
    <section class="pokemon">
        <div class="pokemon__card" v-for="(pokemon, index) in pokemons" :key="index">
            <div class="pokemon__content">
                <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdPokemon(pokemon)}.png`" alt="">
                <h3>{{ pokemon.name }}</h3>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import eventBus from "@/eventBus";

export default {
  name: "ListPokemons",
  data() {
    return {
      pokemons: null,
      originalPokemons: null,
    };
  },
  methods: {
    getPokemons() {
      axios.get("https://pokeapi.co/api/v2/pokemon/?limit=50")
        .then(response => {
          this.pokemons = response.data.results;
          this.originalPokemons = [...response.data.results];
        });
    },
    getIdPokemon(pokemon) {
      return pokemon.url.split("/")[6];
    },
    getSearchedPokemons(searchedTerm) {
      if (this.originalPokemons) {
        this.pokemons = this.originalPokemons.filter(pokemon => {
          return pokemon.name.startsWith(searchedTerm);
        });
      }
    },
  },
  created() {
    this.getPokemons();
    eventBus.$on("searchedPokemons", this.getSearchedPokemons);
  },
};
</script>


<style lang="scss" scoped>
.pokemon {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    justify-items: center;
    margin: 0 24px 0 24px;
    &__card {
        background: #f5f5f5;
        border-radius: 20px;
        width: 100%;
    }
    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
}
</style>