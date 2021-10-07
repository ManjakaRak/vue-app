<template>
  <nav class="navbar navbar-expand-sm">
    <a class="navbar-brand text-danger" id="main-title" href="#">My<span>I</span>mmo</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"><i class="text-danger fas fa-list"></i></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link active" to="/"><i class="fa fa-home" aria-hidden="true"></i> Accueil <span class="sr-only">(current)</span></router-link>
        <router-link to="/add-property" class="nav-item nav-link" href="#"><i class="fa fa-building" aria-hidden="true"></i> Propriétés</router-link>
        <div id="category">
          <a v-on:mouseover="showMenu" v-on:mouseout="hideMenu" :id="{'is-active':showCategoryMenu}" class="nav-item nav-link is-active" href="#" tabindex="-1" aria-disabled="true">Categorie <i class="fa fa-caret-down" aria-hidden="true"></i></a>
          <transition name="fade-category">
            <div v-show="showCategoryMenu" v-on:mouseout="hideMenu" v-on:mouseover="showMenu" id="menu-category">
              <div>
              <ul>
                <a href="#">
                  <li id="alloc">Allocation</li>
                </a>
                <a href="#">
                  <li>Achat</li>
                </a>
              </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {

  name: 'Navbar',

  data () {
    return {
      showCategoryMenu: false
    }
  },

  methods: {
    showMenu () {
      this.showCategoryMenu = true
    },
    hideMenu () {
      this.showCategoryMenu = false
    }

  }
}
</script>

<style scoped>
  .fade-category-enter {
    opacity: 0;
    transform: translateY(-10px);
  }
  .fade-category-enter-active {
    transition: all 300ms ease;
  }
  .fade-category-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  .fade-category-leave-active {
    transition: all 300ms ease-in-out;
  }
  #is-active {
    color: #dc3545;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  nav {
    background-color: #1b3558;
    position: fixed;
    z-index: 9000;
    width: 100%;
  }
  .navbar-nav a {
    transition: all 200ms ease;
    font-size: 20px;
    color: rgb(19, 19, 19);
    height: fit-content;
    font-family: 'AnjaliOldLipi';
    color: rgb(209, 209, 209)
  }
  .navbar-nav a:not(#category-link):hover {
    color: #dc3545;
    padding-top: 5px;
  }
  #main-title {
    font-family: 'Purisa';
    font-weight: 900;
    font-size: 2em;
    position: relative;
  }
  #main-title span{
    font-size: 1.5em;
  }

  /* category menu */

  #category {
    position: relative;
  }
  #menu-category {
    position: absolute;
    top: 45px;
    width: 100%;
    left: 0;
    color: rgb(255, 255, 255);
    background-color: #ffffffd5;
    box-shadow: 1px 1px 5px black;
    font-size: 20px;
  }
  #menu-category ul a li {
    padding: 10px;
    width: 100%;
  }
  #menu-category ul a li:hover {
    background-color: #dc3546ee;
    color:blanchedalmond;
  }
  #menu-category ul a {
    color: #dc3546ee
  }
  #menu-category ul a:hover {
    text-decoration: none;
  }
  #alloc {
    position: relative;
  }
  #menu-category::before {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    border: 10px solid;
    border-color: transparent transparent #ffffffd5 transparent;
  }
</style>
