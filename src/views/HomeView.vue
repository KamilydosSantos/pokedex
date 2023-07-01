<template>
  <div class="home">
    <div class="sticky-wrapper">
      <TheHeader />
      <SearchPokemons />
    </div>
    <ListPokemons />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import SearchPokemons from '@/components/SearchPokemons.vue';
import ListPokemons from '@/components/ListPokemons.vue';

export default {
  name: 'HomeView',
  components: {
    TheHeader,
    SearchPokemons,
    ListPokemons
  }
}
</script>

<style lang="scss" scoped>
.sticky-wrapper {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  padding: 24px;
}
</style>