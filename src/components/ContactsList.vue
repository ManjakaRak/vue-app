<template>
  <div>
    <ban-component></ban-component>
    <div class="container mt-5">

      <h3 class="text-warning">Tous les contacts</h3>
      <table class="table table-striped table-responsive">
        <thead class="thead-inverse">
          <tr>
            <th>Client</th>
            <th>Propriété</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact._id">
              <td scope="row">{{contact.name}}</td>
              <td>{{contact.property.name}}</td>
            </tr>
            <!-- <tr>
              <td scope="row">Rose</td>
              <td>Miller</td>
            </tr> -->
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Ban from './Ban.vue'
import Footer from './Footer.vue'
import axios from 'axios'
export default {
  name: 'ConstacsList',
  components: {
    'ban-component': Ban,
    'footer-component': Footer
  },
  data () {
    return {
      contacts: []
    }
  },
  methods: {
    async loadContacts () {
      await axios({
        url: 'http://localhost:5000/api/contacts',
        method: 'GET'
      })
        .then(response => {
          this.contacts = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.loadContacts()
  }
}
</script>

<style>
  thead {
    background-color: #1b3558;
    color: white
  }
</style>
