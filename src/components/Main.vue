<template>
  <div class="main" @click="hideNotification">
    <transition name="notification">
      <div v-if="propertyAdded" id="notification-content">
        <div id="notification">Propriété ajoutée <i class="fa fa-check-circle" aria-hidden="true"></i></div>
      </div>
    </transition>
    <ban-component></ban-component>
    <div  class="main-container row">
      <section class="col-md-9">
        <div class="center">
          <div class="home">
            <h3>Mon contenue ACCUEIL</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos vel hic similique autem doloribus quasi cumque officiis ex commodi mollitia praesentium velit omnis, minus, totam dolor dolorem ratione ipsam vero!</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos vel hic similique autem doloribus quasi cumque officiis ex commodi mollitia praesentium velit omnis, minus, totam dolor dolorem ratione ipsam vero!</p>
            <div class="row">
              <div class="col-lg-6 item " v-for="property in properties" :key="property._id">
                <property-component :property="property"></property-component>
              </div>
              <p v-if="emptyProperties" class="display-4">Pas de propriété pour le moment</p>
            </div>
          </div>
        </div>
      </section>
      <aside class="col-md-3">
        <div class="aside-content">
          <h4>Aside</h4>
          <hr class="separator">
          <ul>
            <li><a href="#">Lorem, ipsum.</a></li>
            <li><a href="#">Lorem, ipsum dolor.</a></li>
            <li><a href="#">Lorem</a></li>
            <li><a href="#">Lorem ipsum dolor sit.</a></li>
          </ul>
        </div>
      </aside>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Ban from './Ban.vue'
import Footer from './Footer'
import Property from './Property.vue'
import axios from 'axios'
export default {
  name: 'Main',
  components: {
    'ban-component': Ban,
    'property-component': Property,
    'footer-component': Footer
  },
  data () {
    return {
      properties: [],
      emptyProperties: true,
      propertyAdded: false
    }
  },
  async mounted () {
    await this.loadProperties()
    await this.checkIfEmptyProperties()
    // operation for notification
    if (this.$route.params.message) {
      this.propertyAdded = true
    }
    // animation on start
    setTimeout(() => {
      // this.propertyAdded = true
      if (this.propertyAdded) {
        document.getElementById('notification-content').style.opacity = '1'
        document.getElementById('notification-content').style.top = '40px'
      }
    }, 100)
    // hide notification automatically
    setTimeout(() => {
      if (this.propertyAdded) {
        this.hideNotification()
      }
    }, 3000)
    // end operation for notification
  },
  methods: {
    async loadProperties () {
      await axios({
        url: 'http://localhost:5000/api/properties',
        method: 'GET'
      })
        .then(response => {
          this.properties = response.data
          // console.log(response.data)
          // check if properties are empty after fetch data from server
          this.checkIfEmptyProperties()
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkIfEmptyProperties () {
      if (this.properties.length !== 0) {
        this.emptyProperties = false
      }
    },
    hideNotification () {
      this.propertyAdded = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #notification-content {
    width: 100%;
    position: fixed;
    z-index: 1000000;
    display: flex;
    align-items: center;
    flex-direction: column;
    opacity: 0;
    transition: all 500ms ease-in;
    top: -100px;
  }
  #notification {
    background-color: #42b983;
    padding: 20px;
    font-size: 20px;
    font-weight: 700;
  }
  .notification-leave-active {
    transition: all 500ms ease-out;
  }
  .notification-leave-to {
    opacity: 0;
    transform: translateY(-100px);
  }
  .col-sm-4 {
    padding: 0;
  }
  .col-md-8{
    padding-right: 0
  }
  .card {
    margin: 20px;
    padding: 0;
    width: auto;
  }
  .main-container {
    width: 100.6%;
  }
  .main {
    background-color: rgb(236, 236, 236);
  }
  .center {
    background-color: white;
    margin: 40px 10px;
    padding: 20px;
    box-shadow: 1px 1px 8px grey;
  }
  .item {
    margin-bottom: 20px;
  }

  /* aside */
  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .aside-content:hover {
    background-color: #001530;
    /* font-size: 18px; */
  }
  .aside-content {
    margin: 15px;
    width: 100%;
    transition: all 200ms ease-out;
    padding: 20px 10px ;
    background-color: #1b3558;
    color: rgb(241, 244, 255);
    font-size: 14px;
  }
  .aside-content h4 {
    text-align: center;
    color: rgb(255, 255, 255);
    font-family: 'AnjaliOldLipi';
  }
  .aside-content hr {
    background-color:white;
  }
  .aside-content ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    margin: 0;
  }
  .aside-content ul li a {
    transition: all 200ms ease;
    padding: 10px 0;
    width: auto;
    height: auto;
  }
  .aside-content ul li a:hover {
    color: #dc3545;
    font-size: 20px;
    text-decoration: none;
  }
  @media screen and (max-width:804px) {
    .card {
      margin: 10px;
      width: 100%;
    }
  }
</style>
