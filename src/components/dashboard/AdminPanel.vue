<template>
  <div class="admin-panel">
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
      max: false,
      contactList: false,
      adminProperties: false
    }
  },
  // METHOD
  methods: {
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
    }
  },
  mounted () {
    (() => {
      if (!this.contactList) {
        this.adminProperties = true
      }
    })()
  }
}
</script>

<style scoped>
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
