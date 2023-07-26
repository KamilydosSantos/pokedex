<template>
    <div class="types">
      <span v-for="pokemonType in types" :key="pokemonType" :class="`type-${pokemonType}`">
        {{ pokemonType }}
      </span>
    </div>
</template>
  
<script>
export default {
    name: "PokemonTypes",
    props: {
      types: {
        type: Array,
        required: true,
      },
    },
};
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
.types {
    display: flex;
    gap: 24px;
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
      max-width: 1200px;
      margin: auto;
    }
}

@each $type, $color in $pokemon-colors {
  .type-#{$type} {
    background-color: $color;
  }
}
</style>