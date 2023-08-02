<template>
    <div class="filters">
        <FilterHeader />
        <FilterPokemons title="Type" :filters="types" />
        <FilterPokemons title="Generation" :filters="generation" />
        <FilterPokemons title="Habitat" :filters="habitat" />
    </div>
</template>

<script>
import FilterPokemons from '@/components/FilterPokemons.vue';
import FilterHeader from '@/components/FilterHeader.vue';
import { api } from '@/services.js';

export default {
    name: 'FiltersView',
    components: {
        FilterHeader,
        FilterPokemons
    },
    data() {
        return {
            types: [],
            generation: [],
            habitat: [],
        }
    },
    methods: {
        async getTypes() {
            await api.get(`/type`)
            .then(response => {
                this.types = response.data.results;
            })
        },
        async getGeneration() {
            await api.get(`/generation`)
            .then(response => {
                this.generation = response.data.results;
            })
        },
        async getHabitat() {
            await api.get(`/pokemon-habitat`)
            .then(response => {
                this.habitat = response.data.results;
            })
        }
    },
    created() {
        this.getTypes();
        this.getGeneration();
        this.getHabitat();
    }
}
</script>

<style lang="scss" scoped>
.filters {
    margin: 24px;
}
</style>