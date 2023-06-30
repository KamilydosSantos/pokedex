<template>
    <header class="header">
        <img class="header__icon" src="@/assets/icon-pokeball.svg" alt="" width="16px" height="16px">
        <h1 class="header__title">Pokédex</h1>
    </header>
</template>

<script>
export default {
    name: "TheHeader",
}
</script>

<style lang="scss" scoped>
.header { 
    display: flex;
    align-items: center;
    &__title {
        margin: 0;
    }
}
</style>