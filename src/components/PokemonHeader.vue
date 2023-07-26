<template>
    <section>
        <div class="header">
            <router-link class="back" to="/"></router-link>
        </div>
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
    z-index: 2;
    columns: 1;
}
.header {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 3;
    height: 50px;
}
</style>