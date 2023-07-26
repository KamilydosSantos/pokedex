<template>
    <section class="content">
        <PokemonIdentification :id="pokemon.id" :name="pokemon.name" />
        <PokemonTypes :types="pokemon.types.map(type => type.type.name)" />
        <PokemonInfos :pokemon="pokemon" />
    </section>
</template>

<script>
import PokemonIdentification from "@/components/PokemonIdentification.vue";
import PokemonTypes from "@/components/PokemonTypes.vue";
import PokemonInfos from "@/components/PokemonInfos.vue";

export default {
    name: "PokemonContent",
    components: {
        PokemonIdentification,
        PokemonTypes,
        PokemonInfos,
    },
    props: {
        pokemon: {
        type: Object,
        required: true,
        },
    },
};
</script>

<style lang="scss">
.content {
    background-color: #ffffff;
    border-radius: 80px 80px 0 0;
    box-shadow: 2px 2px 4px #d3d3d3;
    padding: 24px;
}
</style>