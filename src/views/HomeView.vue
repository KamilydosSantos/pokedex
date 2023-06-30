<template>
  <div class="home">
    <SearchPokemons />
    <ListPokemons />
  </div>
</template>

<script>
import SearchPokemons from '@/components/SearchPokemons.vue';
import ListPokemons from '@/components/ListPokemons.vue';

export default {
  name: 'HomeView',
  components: {
    SearchPokemons,
    ListPokemons
  }
}
</script>
