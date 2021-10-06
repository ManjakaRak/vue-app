<template>
  <div class="content">
    <div class="card-header">
      <ul class="nav nav-pills card-header-pills">
        <li class="nav-item">
          <h3>
            <a class="nav-link" href="#">{{ property.name }}</a>
          </h3>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">({{ property.category }})</a>
        </li>
      </ul>
    </div>
    <div class="card-body text-center">
      <img src="../assets/logo.png" class="img" alt="" srcset="">
      <div v-on:mouseover="handleShowDetail" v-on:mouseout="handleHideDetail" class="transparent-bg" >
        <transition name="fade-detail">
          <router-link v-bind:to="{name: 'Detail', params:{id: property._id}}"> <button v-show="showDetailButton" class="detail-btn">Details</button></router-link>:
        </transition>
      </div>
    </div>
    <div class="card-footer">
      <small class="text-info display-4">{{ formattedPrice }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Property',
  props: ['property'],
  data () {
    return {
      showDetailButton: false
    }
  },
  methods: {
    handleHideDetail () {
      if (this.showDetailButton === true) {
        this.showDetailButton = false
      }
    },
    handleShowDetail () {
      if (this.showDetailButton === false) {
        this.showDetailButton = true
      }
    }
  },
  computed: {
    formattedPrice () {
      let tab = Array.from(this.property.price)
      let j = 0
      for (let i = tab.length - 1; i >= 0; i--) {
        j = j + 1
        if (j % 3 === 0 && i !== 0) {
          tab[i] = '.' + tab[i]
        }
      }
      return tab.join('') + ' €'
    }
  }
}
</script>

<style scoped>
.nav-link {
  color: rgb(252, 68, 48);
}
.detail-btn {
  width: 180px;
  padding: 10px;
  background-color: rgba(247, 125, 111, 0.103);
  border: 1.5px solid rgb(252, 68, 48);
  color: rgb(252, 68, 48);
}
.detail-btn:hover {
  background-color: rgb(252, 68, 48);
  color: white
}
.fade-detail-enter {
  transition: all 200ms ease-in;
}
.fade-detail-enter-active {
  opacity: 0;
}
.fade-detail-leave-to {
  opacity: 0;
}
.fade-detail-leave-active {
  transition: all 200ms ease-in;
}
.content {
  border: 1px solid #17a2b8
}
.card {
  margin: 20px;
  padding: 0;
  width: auto;
}
.card-body {
  position: relative;
}
.transparent-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: none;
  top: 0;
  left: 0;
  transition: all 200ms ease-in;
  display: table-cell;
}
.transparent-bg button {
  margin: 100px auto;
}
.transparent-bg:hover {
  background-color: rgba(0, 0, 0, 0.699);
}
.transparent-bg:focus {
  border: none;
}
@media screen and (max-width:804px) {
  .card {
    margin: 10px;
    width: 100%;
  }
}
</style>
