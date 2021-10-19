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
            <td><span @click="handleClick(contact.property._id)" class="property-name">{{contact.property.name}}</span></td>
            <td class="action"><a href=""><button class="btn btn-warning">Check</button></a></td>
          </tr>
        </tbody>
    </table>
    <!-- PROPERTY -->
    <transition name="fade-menu">
      <property-component :propPropertyId="propertyId" @hide="hide" v-if="showProperty"></property-component>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import AdminDetailVue from './AdminDetail.vue'
export default {
  name: 'AdminContact',
  // COMPONENTS
  components: {
    'property-component': AdminDetailVue
  },
  // DATA
  data () {
    return {
      contacts: [],
      showProperty: false,
      propertyId: ''
    }
  },
  // METHODS
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
    },
    handleClick (params) {
      this.showProperty = true
      this.propertyId = params
    },
    hide () {
      this.showProperty = false
    }
  },
  // MOUNTED
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
  .property-name:hover {
    color: cornflowerblue;
    cursor: pointer
  }
</style>
