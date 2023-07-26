<template>
    <div class="infos" v-if="info">
      <h2 class="infos__name">{{ title }}</h2>
      <p class="infos__info">{{ info | capitalizeFirstLetter }}</p>
    </div>
</template>
  
<script>
import { capitalizeFirstLetter } from "@/utils.js";

export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      info: {
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
.infos {
    display: flex;
    justify-content: space-between;
    max-width: 1184px;
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
</style>