<template>
    <div class="apply">
        <button class="apply__button">Apply</button>
    </div>
</template>

<script>
export default {
    name: "FilterApply",
}
</script>

<style lang="scss" scoped>
.apply {
    &__button {
        background-color: #de0d0d;
        border: none;
        padding: 20px;
        width: 100%;
        border-radius: 20px;
        color: #ffffff;
        font-size: 1rem;
        font-weight: bold;
    }
}
</style>