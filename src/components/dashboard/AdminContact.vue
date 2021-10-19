<template>
  <div>
    <h3 class="text-danger">Tous les contacts</h3>
    <table class="table table-striped table-responsive">
      <thead class="thead-inverse">
        <tr>
          <th>Client</th>
          <th>Propriété</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact._id">
            <td>{{contact.name}}</td>
            <td><router-link v-bind:to="{name: 'Property', params: {id: contact.property._id}}">{{contact.property.name}}</router-link></td>
            <td class="action"><a href=""><button class="btn btn-warning">Check</button></a></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminContact',
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
  table {
    text-align: center;
  }
  thead {
    background-color: #428A8BFF;
    color: white
  }
  td:not(td.action) {
    padding-top: 15px;
  }
  a {
    color: red;
    text-decoration: none;
    /* font-family: 'Courier New', Courier, monospace; */
  }
</style>
