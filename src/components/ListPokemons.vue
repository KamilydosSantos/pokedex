<template>
    <section class="pokemon">
        <div v-for="pokemon in pokemons" :key="pokemon">{{ pokemon.name }}</div>
    </section>
</template>

<script>
import axios from "axios"

export default {
    name: "ListPokemons",
    data() {
        return {
            pokemons: null,
        }
    },
    methods: {
        getPokemons() {
            axios.get("https://pokeapi.co/api/v2/pokemon/?limit=50")
            .then(response => {
                this.pokemons = response.data.results;
            });
        }
    },
    created() {
        this.getPokemons();
    }
}
</script>

<style>

</style>