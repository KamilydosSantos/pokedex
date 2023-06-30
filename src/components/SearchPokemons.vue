<template>
    <div class="search">
        <input class="search__input" type="text" placeholder="Search Pokémon" />
        <img class="search__icon" src="@/assets/icon-search.png" alt="Search icon" />
      </div>
</template>

<script>
export default {
    name: "SearchPokemon"
}
</script>

<style lang="scss" scoped>
.search {
    position: relative;
    &__input {
      height: 36px;
      width: 100%;
      padding: 24px 24px 24px 36px;
      box-sizing: border-box;
      background-color: #f5f5f5;
      color: #525252;
      font-size: 1rem;
      border: none;
      outline: 0;
      border-radius: 20px;
    }
    &__icon {
      position: absolute;
      top: 16px;
      left: 12px;
    }
  }
</style>