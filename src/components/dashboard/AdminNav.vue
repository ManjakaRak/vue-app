<template>
  <div id="admin-nav-component">
    <ul id="options-list">
      <li><router-link :to="{name: 'Main'}"><i class="fa fa-arrow-left title icon" aria-hidden="true"></i><span class="text"> My Immo</span></router-link></li>
      <li @click="handleClick(properties)"><i class="fa fa-home icon" aria-hidden="true"></i><span class="text"> Proprietes</span></li>
      <li @click="handleClick(contact)"><i class="fa fa-handshake icon" aria-hidden="true"></i><span class="text"> Contacts</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AdminNav',
  data () {
    return {
      properties: 'properties',
      contact: 'contact'
    }
  },
  mounted () {
    const adminDashboar = document.querySelector('#options-list')
    const screenHeight = window.frames.innerHeight
    adminDashboar.style.height = `${screenHeight}px`
  },
  methods: {
    handleClick (option) {
      // emit params to adminPanel
      this.$emit('switchMenu', option)
    }
  }
}
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  .title {
    color: #C7073EFF;
  }
  a {
    text-decoration: none;
    color: black;
  }
  #admin-nav-component {
    background-color: cadetblue;
    color: rgb(7, 3, 7);
  }
  #options-list {
    padding-top: 30px;
  }
  ul {
    list-style: none;
  }
  .text {
    transition: all .2s cubic-bezier(0.075, 0.82, 0.165, 1);
    position: absolute;
    opacity: 0;
    left: 30px;
  }
  li {
    margin-bottom: 10px;
    font-size: 20px;
    padding: 10px;
    /* transition: all .2s cubic-bezier(0.075, 0.82, 0.165, 1); */
  }
  li:hover {
    background-color: #428A8BFF;
    opacity: 0.8;
    cursor: pointer;
  }
  .show {
    left: 50px;
    opacity: 1;
  }
</style>
