<template>
    <section>
        <div class="images">
            <img class="images__image" :src="pokemonImage" alt="" width="200px">
            <img class="images__floor" src="@/assets/pokemon-floor.svg" alt="">
        </div>
    </section>
</template>

<script>
export default {
    name: "PokemonImage",
    props: {
        pokemonImage: {
            type: String,
            required: true,
        },
    }
}
</script>

<style lang="scss" scoped>
.images {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &__image {
        z-index: 1;
    }
    &__floor {
        position: absolute;
        bottom: 30px;
    }
}

@media (min-width: 1080px) {
    .images {
        margin: 40px;
        &__image {
            width: 350px;
        }
        &__floor {
            width: 300px;
            bottom: 45px;
        }
    }
}
</style>