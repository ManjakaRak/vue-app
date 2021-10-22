<template>
  <div>
    <h3 class="text-danger">Tous les contacts</h3>
    <table class="table table-striped table-responsive">
      <thead class="thead-inverse">
        <tr>
          <th>Clients</th>
          <th>Propriétés</th>
          <th>Statut</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact._id">
            <td><span @click="handleClickProperty(contact, 'contact')">{{contact.name}}</span></td>
            <td><span @click="handleClickProperty(contact.property._id, 'property')" class="property-name">{{contact.property.name}}</span></td>
            <td class="text-primary" ><i :class="{'fa fa-info-circle': contact.pending, 'fa fa-check-circle text-success': !contact.pending}" aria-hidden="true"></i></td>
            <td>
              <div class="text-center">
                <div class="button">
                  <button v-if="contact.pending" class="btn btn-warning">Check</button>
                </div>
                <div class="button">
                  <form class="text-right delete-form">
                    <button class="btn btn-danger">Supprimer</button>
                  </form>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
    </table>
    <!-- PROPERTY & CONTACT -->
    <transition name="fade-menu">
      <property-component :type="type" :contact="contact" :propPropertyId="propertyId" @hide="hide" v-if="showProperty"></property-component>
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
      contact: {},
      showProperty: false,
      showContact: false,
      propertyId: ''
    }
  },
  // METHODS
  methods: {
    // CHECKING ORDER
    checkContact () {

    },
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
    // SHOW PROPERTY COMPONENT ON CLICK
    handleClickProperty (params, type) {
      this.showProperty = true
      if (type === 'contact') {
        this.type = 'contact'
        this.contact = params
      } else if (type === 'property') {
        this.type = 'property'
        this.propertyId = params
      }
    },
    // SHOW CONTACT COMPONENT ON CLICK
    handleClickContact () {
      this.showContact = true
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
/* DELETE BUTTON */
  .button {
    display: inline-block;
  }
  .action {
    display: flex;
  }
  .action div {
    margin-right: 30px;
  }
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
