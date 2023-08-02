<template>
    <div class="filter">
      <select class="filter__select" name="filter">
        <option value="title" desabled>{{ title }}</option>
        <option v-for="(filter, index) in filters" :key="index" value="title" desabled>{{ filter.name | capitalizeFirstLetter }}</option>
      </select>
    </div>
</template>
  
<script>
import { capitalizeFirstLetter } from "@/utils.js";

export default {
    name: "FilterPokemons",
    props: {
        title: {
            type: String,
            required: true,
        },
        filters: {
          type: Array,
          required: true,
        }
    },
    filters: {
        capitalizeFirstLetter,
    },
};
</script>

<style lang="scss" scoped>
.filter__select {
  width: 100%;
}
</style>