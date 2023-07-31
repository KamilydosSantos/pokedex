<template>
    <section class="header">
        <router-link class="back" to="/"></router-link>
    </section>
</template>

<script>
export default {
    name: "PokemonHeader",
}
</script>

<style lang="scss" scoped>
.back {
    padding: 20px;
    background: url("../assets/back-button.svg") no-repeat center center;
}
.header {
    display: flex;
    align-items: center;
    height: 50px;
}

@media (min-width: 1080px) {
    .header {
        display: none;
    }
}
</style>