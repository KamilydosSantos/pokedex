<template>
    <section class="pokemon">
        <div class="pokemon__card" v-for="(pokemon, index) in pokemons" :key="index">
            <router-link :to="{name: 'pokemon', params: {id: getIdPokemon(pokemon)}}" class="pokemon__content">
                <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdPokemon(pokemon)}.png`" alt="">
                <h3>{{ pokemon.name }}</h3>
            </router-link>
        </div>
        <PaginatePokemons v-if="pokemons" class="paginate-pokemons" :totalPokemons="totalPokemons" :pokemonsPerPage="pokemonsPerPage" :offsetPokemons="offsetPokemons" @page-changed="updatePage"/>
    </section>
</template>

<script>
import PaginatePokemons from "@/components/PaginatePokemons.vue";
import { api } from "@/services.js";
import eventBus from "@/eventBus";

export default {
  name: "ListPokemons",
  components: {
    PaginatePokemons,
  },
  data() {
    return {
      pokemons: null,
      totalPokemons: 0,
      pokemonsPerPage: 26,
      offsetPokemons: 1,
      defaultImageUrl: "/pokemon-not-found.png",
    };
  },
  methods: {
    getPokemons() {
      const pagePokemons = this.pokemonsPerPage * (this.offsetPokemons - 1);
      api.get(`/pokemon/?offset=${pagePokemons}&limit=${this.pokemonsPerPage}`)
      .then(response => {
        this.totalPokemons = Number(response.data.count);
        this.pokemons = response.data.results;
      });
    },
    getIdPokemon(pokemon) {
      return pokemon.url.split("/")[6];
    },
    getSearchedPokemons(searchedTerm) {
      if(searchedTerm != "") {
        api.get(`/pokemon/?limit=${this.totalPokemons}`)
        .then( response => {
          this.pokemons = response.data.results.filter(pokemon => {
            return pokemon.name.startsWith(searchedTerm);
          });
        });
      } else {
        this.getPokemons();
      }
    },
    updatePage(page) {
      this.offsetPokemons = page;
    },
  },
  created() {
    this.getPokemons();
    eventBus.$on("searchedPokemons", this.getSearchedPokemons);
  },
  watch: {
    offsetPokemons(offset) {
      this.getPokemons(offset);
    }
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
        box-shadow: 2px 2px 4px #d3d3d3;
    }
    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-decoration: none;
        color: #000000;
    }
    .paginate-pokemons {
      grid-column: 1/3;
    }
}
</style>