<template>
    <section>
        <div v-if="pokemon" class="pokemon" :class="`background-${pokemon.types[0].type.name}`">
            <div class="pokemon__top">
                <router-link class="back" to="/"></router-link>
                <!-- <h2 class="pokemon__id">Pokémon {{ id }}</h2> -->
            </div>
            <div class="pokemon__images">
                <img class="pokemon__images__image" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" alt="" width="200px">
                <img class="pokemon__images__floor" src="../assets/pokemon-floor.svg" alt="">
            </div>
            <div class="pokemon__content">
                <div class="pokemon__identification">
                    <p class="pokemon__identification__id">{{ id }}</p>
                    <h1 class="pokemon__identification__name">{{ pokemon.name }}</h1>
                </div>
                <div v-if="pokemon.types" class="pokemon__types">
                    <span v-for="index in pokemon.types.length" :key="index" :class="`pokemon__type-${pokemon.types[index - 1].type.name}`">
                        {{ pokemon.types[index - 1].type.name }}
                    </span>
                </div>
                <div v-if="pokemon.abilities" class="pokemon__infos">
                    <h2 class="pokemon__infos__name">Abilities</h2>
                    <p class="pokemon__infos__info">{{ pokemon.abilities.map(item => item.ability.name).join(', ') }}</p>
                </div>
                <div v-if="habitat" class="pokemon__infos">
                    <h2 class="pokemon__infos__name">Habitat</h2>
                    <p class="pokemon__infos__info">{{ habitat }}</p>
                </div>
                <div v-if="generation" class="pokemon__infos">
                    <h2 class="pokemon__infos__name">Generation</h2>
                    <p class="pokemon__infos__info">{{ generation }}</p>
                </div>
                <div class="pokemon__infos__evolutions">
                    <h2 class="pokemon__infos__name">Evolutions</h2>
                    <img class="pokemon__infos__evolution" v-for="pokemon in evolutionImages" :key="pokemon" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`" alt="" width="100px">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { api } from "@/services.js";

export default {
    name: "PokemonPage",
    props: ["id"],
    data() {
        return {
            pokemon: null,
            habitat: null,
            generation: null,
            evolutionChain: null,
            evolutions: null,
            evolutionImages: null,
        };
    },
    methods: {
        getPokemon() {
            api.get(`/pokemon/${this.id}`)
            .then(response => {
                this.pokemon = response.data;
            });
        },
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
                } else {
                    this.generation = "Informação não disponível";
                }
                if (infosResponse.data.evolution_chain) {
                    this.evolutionChain = infosResponse.data.evolution_chain.url.split("/")[6];
                    this.getEvolutionChain();
                } else {
                    this.evolutionChain = "Informação não disponível";
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getEvolutionChain() {
            try {
                const evolutionResponse = await api.get(`/evolution-chain/${this.evolutionChain}`);
                const evolutionData = evolutionResponse.data.chain;
                if (evolutionData) {
                    this.evolutions = this.getAllEvolutions(evolutionData);
                    this.evolutionImages = this.getAllEvolutionsImg(evolutionData);
                }
            } catch (error) {
                console.log(error);
            }
        },
        getAllEvolutions(evolution) {
            const evolutionsList = [];
            evolutionsList.push(evolution.species.name);

            if (evolution.evolves_to.length > 0) {
                for (const nextEvolution of evolution.evolves_to) {
                    evolutionsList.push(...this.getAllEvolutions(nextEvolution));
                }
            }

            return evolutionsList;
        },
        getAllEvolutionsImg(evolution) {
            const evolutionsImg = [];
            evolutionsImg.push(evolution.species.url.split("/")[6]);

            if (evolution.evolves_to.length > 0) {
                for (const nextEvolution of evolution.evolves_to) {
                    evolutionsImg.push(...this.getAllEvolutionsImg(nextEvolution));
                }
            }
            return evolutionsImg;
        },
    },
    created() {
        this.getPokemon();
    },
    watch: {
        pokemon: {
            immediate: true,
            handler() {
                if (this.pokemon) {
                    this.getInfos();
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$pokemon-colors: (
  "normal": #AF8545,
  "flying": #196C72,
  "fire": #C62C2C,
  "fighting": #E38E0F,
  "poison": #8B11C5,
  "ground": #884E18,
  "rock": #6A625F,
  "bug": #2F812D,
  "ghost": #2C0892,
  "steel": #3D6488,
  "water": #1179C5,
  "grass": #6B9511,
  "electric": #CD9E15,
  "psychic": #960F70,
  "ice": #15C8D3,
  "dragon": #DE4C0D,
  "dark": #353348,
  "fairy": #E45C8D,
  "unknown": #000000,
  "shadow": #5A2679
);

.back {
    padding: 20px;
    background: url("../assets/back-button.svg") no-repeat center center;
    z-index: 2;
    column: 1;
}


.pokemon {
    display: grid;
    grid-template-rows: 50px 200px 1fr;
    height: 100vh;
    &__top {
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 3;
    }
    &__images {
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
    &__content {
        background-color: #ffffff;
        border-radius: 80px 80px 0 0;
        height: 100%;
        box-shadow: 2px 2px 4px #d3d3d3;
        padding: 24px;
    }
    &__identification {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        &__name {
            margin: 0;
        }
        &__id {
            margin: 0;
            color: rgba(0, 0, 0, .5);
        }
    }
    &__types {
        display: flex;
        gap: 24px;
        max-width: 1200px;
        margin: auto;
        justify-content: center;
        span {
            color: #ffffff;
            height: 24px;
            width: 100%;
            border-radius: 20px;
            font-size: 1rem;
            font-weight: 700;
            text-align: center;
            padding: 6px;
        }
    }
    &__infos {
        display: flex;
        justify-content: space-between;
        max-width: 1200px;
        margin: 20px auto;
        padding: 14px;
        background-color: rgba(0, 0, 0, 0.03);
        border-radius: 20px;
        &__name,
        &__info {
            flex: 1;
            font-size: 1rem;
            margin: 0;
        }
        &__name {
            text-align: left;
        }
        &__info {
            text-align: right;
        }
        &__evolutions {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            margin-top: 24px;
            h2 {
                flex: 1 0 100%;
                text-align: center;
            }
        }
        &__evolution {
            justify-self: center;
            background: #f5f5f5;
            border-radius: 20px;
        }
    }
}

@each $type, $color in $pokemon-colors {
  .pokemon__type-#{$type} {
    background-color: $color;
  }
}

@each $type, $color in $pokemon-colors {
  .background-#{$type} {
    background: linear-gradient(to bottom, rgba($color, 0.5), $color 40%);
  }
}
</style>