<template>
  <div id="app">
    <navbar-component></navbar-component>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
// import 'bootstrap/dist/js/bootstrap'
export default {
  name: 'App',
  components: {
    'navbar-component': Navbar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
