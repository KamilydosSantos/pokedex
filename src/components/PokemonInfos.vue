<template>
    <div>
        <PokemonInfo v-if="pokemon.abilities" title="Abilities" :info="pokemon.abilities.map(item => item.ability.name).join(', ')" />
        <PokemonInfo v-if="habitat" title="Habitat" :info="habitat" />
        <PokemonInfo v-if="generation" title="Generation" :info="generation" />
        <PokemonEvolutions :evolutionChain="evolutionChain" :pokemonId="pokemon.id" />
    </div>
</template>
  
<script>
import PokemonInfo from "@/components/PokemonInfo.vue";
import PokemonEvolutions from "@/components/PokemonEvolutions.vue";
import { api } from "@/services.js";

export default {
    name: "PokemonInfos",
    components: {
        PokemonInfo,
        PokemonEvolutions,
    },
    props: {
        pokemon: {
        type: Object,
        required: true,
        },
    },
    data() {
        return {
            habitat: null,
            generation: null,
            evolutionChain: "",
        };
    },
    methods: {
        async getInfos() {
            try {
                const infosResponse = await api.get(this.pokemon.species.url);
                if (infosResponse.data.habitat) {
                    this.habitat = infosResponse.data.habitat.name;
                } else {
                    this.habitat = "Informação não disponível";
                }
                if (infosResponse.data.generation) {
                    this.generation = infosResponse.data.generation.name;
                }
                if (infosResponse.data.evolution_chain) {
                    this.evolutionChain = infosResponse.data.evolution_chain.url.split("/")[6];
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getInfos();
    },
};
</script>

<style lang="scss" scoped>

</style>