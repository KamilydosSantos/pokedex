<template>
    <div class="identification">
      <p class="identification__id">{{ id }}</p>
      <h1 class="identification__name">{{ name }}</h1>
    </div>
  </template>
  
<script>
export default {
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
</style>