<template>
    <div class="search">
      <input class="search__input" type="text" placeholder="Search Pokémon" v-model="searchTerm" />
      <input class="search__btn" type="submit" id="search-btn" value="search" @click="searchPokemons">
    </div>
</template>

<script>
import eventBus from "@/eventBus";

export default {
    name: "SearchPokemon",
    data() {
    return {
      searchTerm: '',
      pokemons: null,
    };
  },
  methods: {
    searchPokemons() {
        const searchedTerm = this.searchTerm.toLowerCase();
        eventBus.$emit('searchedPokemons', searchedTerm);
    },
  }
};
</script>

<style lang="scss" scoped>
.search {
    position: relative;
    &__input {
      height: 36px;
      width: 100%;
      padding: 24px;
      box-sizing: border-box;
      background-color: #f5f5f5;
      color: #525252;
      font-size: 1rem;
      border: none;
      outline: 0;
      border-radius: 20px;
    }
    &__btn {
      position: absolute;
      top: 0px;
      right: 0px;
      height: 48px;
      width: 48px;
      padding: 0;
      border: none;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background: url("../assets/icon-search.png") no-repeat center center;
      text-indent: -150px;
      cursor: pointer;
    }
  }
</style>