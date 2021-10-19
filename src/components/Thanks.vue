<template>
  <div id="thanks-component">
    <nav-component></nav-component>
    <div class="thanks-content">
      <div>
        <div class="jumbotron">
          <h1 class="display-3 text-success">My Immo vous remercie!!! <i class="fa fa-check-circle text-success" aria-hidden="true"></i></h1>
          <p class="lead">Votre demande a ete pris en compte, on vous contactera tres bientot</p>
          <hr class="my-2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from './Footer.vue'
import Navbar from './Navbar.vue'
export default {
  name: 'AdminLogin',
  components: {
    'footer-component': Footer,
    'nav-component': Navbar
  },
  mounted () {
    if (this.$route.params.check) {
      console.log('check')
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  #thanks-component {
    height: 100%;
  }
  .thanks-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }
</style>
