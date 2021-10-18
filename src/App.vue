<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    // 'navbar-component': Navbar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0
}
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
