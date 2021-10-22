<template>
  <div id="login">
    <notif-component :notifp="notif" :showNotifp="logout" :message="messageNotif"></notif-component>
    <nav-component></nav-component>
    <div class="form-login">
      <div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nom: </label><input @keyup="checkForm" v-model="user.name" type="text" id="name" class="form-control" placeholder="votre nom *">
        </div>
        <div class="form-group">
          <label for="password">Mot de passe: </label><input @keyup="checkForm" v-model="user.password" type="password" id="password" class="form-control" placeholder="votre mot de passe *">
        </div>
        <div class="text-center">
          <small v-if="error" class="error">{{message}}</small>
        </div>
        <div class="submit">
          <button v-if="check" id="btn-submit" class="btn btn-success">Se connecter</button>
        </div>
      </form>
      </div>
    </div>
  <!-- <footer-component></footer-component> -->
  </div>
</template>

<script>
import axios from 'axios'
import Footer from './Footer.vue'
import Navbar from './Navbar.vue'
import Notif from './Notification.vue'
export default {
  name: 'AdminLogin',
  components: {
    'footer-component': Footer,
    'nav-component': Navbar,
    'notif-component': Notif
  },
  data () {
    return {
      user: {
        name: '',
        password: ''
      },
      error: false,
      message: '',
      nameCheck: false,
      passwordCheck: false,
      check: false,
      logout: false,
      notif: this.$route.params.logout,
      messageNotif: 'Vous etes deconnectez'
    }
  },
  methods: {
    // check if user Credentials are valid or not empty
    checkForm () {
      // if valid show submit button
      if (this.nameCheck && this.passwordCheck) {
        this.check = true
      } else { // else hidden
        this.check = false
      }
    },
    handleSubmit () {
      axios({
        url: 'http://localhost:5000/api/admin/login',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: this.user
      })
        .then(response => {
          const token = response.data.token
          // if user valid -> get token generated from server
          window.localStorage.setItem('auth', `${token}`)
          this.$router.push({name: 'AdminPanel', params: {login: true, token: token}})
        })
        .catch(error => {
          if (error.response.data.message) {
            this.error = true
            this.message = error.response.data.message
          } else {
            this.error = false
          }
        })
    }
  },
  watch: {
    'user.name' () {
      if (this.user.name === '') {
        this.nameCheck = false
      } else {
        this.nameCheck = true
      }
    },
    'user.password' () {
      if (this.user.password === '') {
        this.passwordCheck = false
      } else {
        this.passwordCheck = true
      }
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
  .form-group {
    margin-bottom: 20px;
  }
  form .submit {
    display: flex;
    justify-content: center;
  }
  form {
    color: honeydew;
    width: 400px;
    height: 100%;
    background-color: rgb(80, 80, 80);
    box-shadow: 4px 4px 4px gray;
    padding: 10px;
  }
  .form-login {
    display: flex;
    height: 100%;
    width: 100%;
    /* min-height: 460px; */
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }
  #login {
    height: 100%;
  }
  .error {
    color: rgb(255, 34, 78)
  }
</style>
