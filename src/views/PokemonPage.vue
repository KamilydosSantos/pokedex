<template>
    <section>
        <div v-if="pokemon" class="pokemon" :class="`background-${pokemon.types[0].type.name}`">
            <div>
                <router-link class="back" to="/"></router-link>
            </div>
            <div class="pokemon__images">
                <img class="pokemon__images__image" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" alt="" width="200px">
                <img class="pokemon__images__floor" src="../assets/pokemon-floor.svg" alt="">
            </div>
            <div class="pokemon__content">
                <h1 class="pokemon__name">{{ pokemon.name }}</h1>
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
            } catch (error) {
                console.log(error);
            }
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
    position: absolute;
    top: 5px;
    left: 5px;
    padding: 20px;
    background: url("../assets/back-button.svg") no-repeat center center;
    z-index: 2;
}


.pokemon {
    display: grid;
    grid-template-rows: 50px 200px 1fr;
    height: 100vh;
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
    &__name {
        padding: 20px;
        margin: 0;
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