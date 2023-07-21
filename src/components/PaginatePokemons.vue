<template>
    <div>
        <ul class="paginate">
            <li class="paginate__page" v-for="page in visiblePages" :key="page"  @click="changePage(page)">
                <router-link class="paginate__route" :to="{query: {offset: page}}">{{ page }}</router-link>
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
            return this.offsetPokemons ? this.offsetPokemons : 1;
        },
        totalPages() {
            const total = this.totalPokemons / this.pokemonsPerPage;
            return (total !== Infinity) ? Math.ceil(total) : 0;
        },
        visiblePages() {
            const rangePages = 7;
            const offsetPage = Math.floor(rangePages / 2);
            const currentPage = this.currentPage;
            const lastPage = this.totalPages;

            let start = currentPage - offsetPage;
            let end = currentPage + offsetPage;

            if (start <= 0) {
                start = 1;
                end = Math.min(start + rangePages - 1, lastPage);
            } else if (end > lastPage) {
                end = lastPage;
                start = Math.max(end - rangePages + 1, 1);
            } else if (end - start < rangePages - 1) {
                start = Math.max(end - rangePages + 1, 1);
            }

            const visiblePages = [];
            for (let i = start; i <= end; i++) {
                visiblePages.push(i);
            }

            return visiblePages;
        }
    }
}
</script>

<style lang="scss" scoped>
.paginate {
    display: flex;
    gap: 2px;
    align-items: center;
    margin: 10px 0;
    padding: 0;
    &__route {
        text-decoration: none;
        font-weight: bold;
        padding: 4px;
        border-radius: 4px;
        color: #000000;
        &:hover,
        &.router-link-exact-active {
            background-color: #de0d0d;
            color: #ffffff;
        }
    }
}
</style>