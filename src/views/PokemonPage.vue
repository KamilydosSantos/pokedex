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
                <div v-if="pokemon.abilities" class="ability">
                    <h2>Abilities</h2>
                    <p>{{ pokemon.abilities.map(item => item.ability.name).join(', ') }}</p>
                </div>
                <div v-if="habitat" class="habitat">
                    <h2>Habitat</h2>
                    <p>{{ habitat.split(' ').join(', ') }}</p>
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
        };
    },
    methods: {
        getPokemon() {
            api.get(`/pokemon/${this.id}`)
            .then(response => {
                this.pokemon = response.data;
            });
        },
        async getHabitat() {
            try {
                const habitatResponse = await api.get(this.pokemon.species.url);
                this.habitat = habitatResponse.data.habitat.name;
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
                    this.getHabitat();
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
        h1 {
            margin: 0;
            padding-top: 24px;
        }
    }
    &__types {
        display: flex;
        gap: 24px;
        padding: 24px;
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
            max-width: 600px;
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