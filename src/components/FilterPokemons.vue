<template>
    <div class="filter">
      <label class="filter__label" for="filter">{{ title }}</label>
      <select class="filter__select" id="filter" name="filter">
        <option value="title" desabled>Select</option>
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
.filter {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  &__label {
    text-align: left;
    font-size: .8rem;
    padding-left: 10px;
  }
  &__select {
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    padding: 16px;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("../assets/select-button.svg");
    background-repeat: no-repeat;
    background-position: right 20px center;
    &:focus {
      outline: none;
      box-shadow: inset 1px 1px 3px #d3d3d3;
    }
  }
}
</style>
