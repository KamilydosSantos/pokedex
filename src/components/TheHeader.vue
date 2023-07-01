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
    padding-bottom: 16px;
    gap: 10px;
    &__icon {
        padding-left: 10px;
    }
    &__title {
        text-align: left;
        margin: 0;
        color: #de0d0d;
    }
}
</style>