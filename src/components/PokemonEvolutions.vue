<template>
    <div class="evolutions" v-if="evolutions.length > 0">
      <h2 class="evolutions__name">Evolutions</h2>
      <div class="evolutions__evolution" v-for="pokemon in evolutions" :key="pokemon.id">
        <img class="evolutions__evolution__img" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" alt="" width="80px">
        <h3 class="evolutions__evolution__name">{{ pokemon.name }}</h3>
      </div>
    </div>
</template>
  
<script>
import { api } from "@/services.js";

export default {
    name: "PokemonEvolutions",
    props: {
        evolutionChain: {
            type: String,
            required: true,
        },
        pokemonId: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            evolutions: [],
        }
    },
    methods: {
        async getEvolutionChain() {
            try {
                const evolutionResponse = await api.get(`/evolution-chain/${this.evolutionChain}`);
                const evolutionData = evolutionResponse.data.chain;
                if (evolutionData) {
                    this.evolutions = this.getAllEvolutions(evolutionData);
                }
            } catch (error) {
                console.log(error);
            }
        },
        getAllEvolutions(evolution) {
        const evolutionsData = [];
        
        const evolutionName = evolution.species.name;
        const evolutionId = evolution.species.url.split("/")[6];
        
        if (parseInt(evolutionId) !== this.pokemonId) {
            const evolutionObject = {
            name: evolutionName,
            id: parseInt(evolutionId),
            };
            evolutionsData.push(evolutionObject);
        }

        if (evolution.evolves_to.length > 0) {
            for (const nextEvolution of evolution.evolves_to) {
            const nextEvolutionsData = this.getAllEvolutions(nextEvolution);
            evolutionsData.push(...nextEvolutionsData);
            }
        }
        return evolutionsData;
        },
    },
    created() {
        this.getEvolutionChain();
    },
    watch: {
    evolutionChain(newVal) {
      if (newVal !== null) {
        this.getEvolutionChain();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.evolutions {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin: 24px auto 0 auto;
    max-width: 1200px;
    &__name {
        flex: 1 0 100%;
        text-align: center;
        font-size: 1rem;
        margin: 0;
    }
    &__evolution {
        justify-self: center;
        background: #f5f5f5;
        border-radius: 20px;
        padding: 20px 30px;
        &__name {
            font-size: 1rem;
            font-weight: 400;
            margin: 0;
        }
    }
}
</style>