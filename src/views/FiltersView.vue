<template>
    <div class="filters">
        <FilterHeader />
        <div class="filters__content">
            <h1 class="filters__title">Filters</h1>
            <FilterPokemons title="Type" :filters="types" />
            <FilterPokemons title="Generation" :filters="generation" />
            <FilterPokemons title="Habitat" :filters="habitat" />
        </div>
        <FilterApply />
    </div>
</template>

<script>
import FilterPokemons from '@/components/FilterPokemons.vue';
import FilterHeader from '@/components/FilterHeader.vue';
import FilterApply from '@/components/FilterApply.vue';
import { api } from '@/services.js';

export default {
    name: 'FiltersView',
    components: {
        FilterHeader,
        FilterPokemons,
        FilterApply
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
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
    padding: 24px;
    height: 100vh;
    box-sizing: border-box;
    &__content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    &__title {
        font-size: 1.2rem;
        text-align: left;
        margin: 0;
    }
}
</style>