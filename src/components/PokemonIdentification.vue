<template>
    <div class="identification">
      <p class="identification__id">{{ id }}</p>
      <h1 class="identification__name">{{ name | capitalizeFirstLetter }}</h1>
    </div>
  </template>
  
<script>
import { capitalizeFirstLetter } from "@/utils.js";

export default {
    name: "PokemonIdentification",
    props: {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    filters: {
      capitalizeFirstLetter,
    },
};
</script>

<style lang="scss" scoped>
.identification {
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

@media (min-width: 1080px) {
  .identification__name {
    font-size: 2rem;
  }
  .identification__id {
    font-size: 1.1rem;
  }
}
</style>