<template>
    <div class="evolutions" v-if="evolutions.length > 0">
      <h2 class="evolutions__name">Evolutions</h2>
      <router-link class="evolutions__router" v-for="pokemon in evolutions" :key="pokemon.id" :to="{ name: 'pokemon', params: { id: pokemon.id } }">
        <div class="evolutions__evolution">
          <img class="evolutions__evolution__img" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" alt="" width="80px">
          <h3 class="evolutions__evolution__name">{{ pokemon.name | capitalizeFirstLetter }}</h3>
        </div>
      </router-link>
    </div>
</template>
  
<script>
import { capitalizeFirstLetter } from "@/utils.js";
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
    filters: {
      capitalizeFirstLetter,
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
        evolutionChain: {
            immediate: true,
            handler() {
                this.getEvolutionChain();
            },
        },
        pokemonId: {
            immediate: true,
            handler() {
                this.getEvolutionChain();
            },
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
    margin: 20px auto 0 auto;
    max-width: 1200px;
    &__router {
        text-decoration: none;
    }
    &__name {
        flex: 1 0 100%;
        text-align: center;
        font-size: 1rem;
        margin: 0;
    }
    &__evolution {
        box-shadow: 2px 2px 4px #d3d3d3;
        justify-self: center;
        background: #f5f5f5;
        border-radius: 20px;
        padding: 20px 30px;
        color: #000000;
        &__name {
            font-size: 1rem;
            font-weight: 400;
            margin: 0;
            color: #000000;
        }
    }
}

@media (min-width: 1080px) {
  .evolutions__name {
    font-size: 1.2rem;
  }
  .evolutions__evolution__img {
    width: 120px;
  }
}
</style>