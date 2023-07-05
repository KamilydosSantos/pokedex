<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

li {
  list-style: none;
}

#app {
  font-family: "Poppins";
  text-align: center;
}
</style>
