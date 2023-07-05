<template>
    <div>
        <ul class="list-page">
            <li v-for="(page, index) in totalPages" :key="page"  @click="changePage(index + 1)">
                <router-link :to="{query: { ...$route.query, offset: page }}">{{ page }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "PaginatePokemons",
    props: {
        pokemonsPerPage: {
            type: Number,
            default: 1
        },
        totalPokemons: {
            type: Number,
            default: 1
        },
        offsetPokemons: {
            type: Number,
            default: 0
        }
    },
    methods: {
        changePage(page) {
            this.$emit("page-changed", page);
        },
    },
    computed: {
        currentPage() {
            return this.offsetPokemons ? this.offsetPokemons + 1 : 1;
        },
        totalPages() {
            const total = Math.ceil(this.totalPokemons / this.pokemonsPerPage);
            return (total !== Infinity) ? Array.from(Array(total).keys(), (i) => i + 1) : 1;
        }
    }
}
</script>

<style lang="scss" scoped>
.list-page {
    display: flex;
    gap: 2px;
}
</style>