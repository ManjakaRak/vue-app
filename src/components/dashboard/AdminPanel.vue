<template>
  <div class="admin-panel">
    <!-- HIDDEN DECONNICTION BUTTON -->
    <div class="deconnect">
      <i @click="showDeconnect" :class="{'fa fa-angle-right': this.show, 'fa fa-angle-left': !this.show}" aria-hidden="true"></i><transition name="fade-deconnect">
        <span @click="deconnectAdmin" v-show="show">Deconnection</span>
    </transition>
    <!-- MAIN CONTENT -->
    </div>
    <div class="admin-nav" @mouseleave="init" @mouseenter="runAnime">
      <admin-nav-component @switchMenu="switchMenu"></admin-nav-component>
    </div>
    <div class="admin-content">
      <transition name="fade-menu">
        <contact-list v-if="contactList"></contact-list>
      </transition>
      <transition name="fade-menu">
        <admin-properties v-if="adminProperties"></admin-properties>
      </transition>
    </div>
  </div>
</template>

<script>
import AdminNavVue from './AdminNav.vue'
import AdminContact from './AdminContact.vue'
import AdminPropertiesVue from './AdminProperties.vue'
import axios from 'axios'
export default {
  // NAME
  name: 'AdminPanel',
  // COMPONENTS
  components: {
    'admin-nav-component': AdminNavVue,
    'contact-list': AdminContact,
    'admin-properties': AdminPropertiesVue
  },
  // DATA
  data () {
    return {
      show: false,
      max: false,
      contactList: false,
      adminProperties: true,
      token: null,
      user: null
    }
  },
  // METHOD
  methods: {
    // DECONNECT THE ADMIN
    deconnectAdmin () {
      window.localStorage.removeItem('auth')
    },
    showDeconnect () {
      if (!this.show) {
        this.show = true
      } else {
        this.show = false
      }
    },
    runAnime () {
      if (!this.max) {
        const panel = document.querySelector('.admin-nav')
        const text = document.querySelectorAll('.text')
        text.forEach(e => {
          e.classList.add('show')
        })
        panel.classList.add('max')
      }
      this.max = true
    },
    init () {
      if (this.max) {
        const panel = document.querySelector('.admin-nav')
        const text = document.querySelectorAll('.text')
        text.forEach(e => {
          e.classList.remove('show')
        })
        panel.classList.remove('max')
      }
      this.max = false
    },
    // fetch params from admin-nav
    switchMenu (params) {
      if (params === 'contact') {
        this.contactList = true
      } else {
        this.contactList = false
      }
      if (params === 'properties') {
        this.adminProperties = true
      } else {
        this.adminProperties = false
      }
      if (params === 'property') {
        this.property = true
      } else {
        this.property = false
      }
    },
    async loadAdminUser () {
      const token = window.localStorage.getItem('auth')
      try {
        await axios({
          method: 'GET',
          url: 'http://localhost:5000/api/admin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        })
      } catch (error) {
        // if token is note valid
        this.$router.push('/admin/login')
      }
    }
  },
  mounted () {
    this.loadAdminUser()
  }
}
</script>

<style scoped>
  /* float deconnection */
  .deconnect {
    transition: all 2s cubic-bezier(0.39, 0.575, 0.565, 1);
    position: fixed;
    right: 0px;
    top: 20px;
    background-color: rgb(255, 235, 56);
    padding:5px 0 5px 10px;
    border-radius:20px 0 0 20px;
  }
  .deconnect span {
    cursor: pointer;
    font-size: 20px;
  }
  .deconnect i {
    font-size: 20px;
  }
  /* anime deconnect */
  .fade-deconnect-enter-active {
    transition: all .3s ease;
  }
  .fade-deconnect-enter {
    opacity: 0;
  }
  /* anime menu */
  .fade-menu-enter {
    transform: translateY(30px);
    opacity: 0;
  }
  .fade-menu-enter-active {
    transition: all .5s ease-in;
  }
  .fade-menu-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }
  .fade-menu-leave-active {
    transition: all .5s cubic-bezier(0.39, 0.575, 0.565, 1);
  }
  * {
    margin: 0;
    padding: 0;
  }
  .admin-panel {
    display: flex;
    flex-direction: row;
    /* align-content: center; */
  }
  .admin-nav {
    transition: all .5s;
    width: 50px;
    height: 100%;
  }
  .admin-content {
    width: 100%;
    height: 100%;
    padding: 30px;
    transition: all .5s;
    margin-top: -6px;
  }
  .max {
    width: 190px;
  }
</style>
