<template>
  <div>
    <!-- NOTIF ON SUCCESS DETELE -->
    <div class="delete-notif delete-notif-hidden">
      <div id="delete-notif-content">Propriete supprime avec succes</div>
    </div>
    <!-- LOADING SCREEN -->
    <div v-if="loading" class="loading">
      <i class="fa fa-spinner display-1 text-primary" aria-hidden="true"></i>
    </div>
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
            <td class="text-primary" >
              <i v-if="!loading" :class="{'fa fa-info-circle': contact.pending, 'fa fa-check-circle text-success': !contact.pending}" aria-hidden="true"></i>
            </td>
            <td>
              <div class="text-center">
                <div class="button">
                  <form @submit.prevent="checkContact(contact)">
                    <button v-if="contact.pending" type="submit" class="btn btn-warning">Check</button>
                  </form>
                </div>
                <div class="button">
                  <form @submit.prevent="deleteProperty(contact._id)" class="text-right delete-form">
                    <button type="submit" class="btn btn-danger">Supprimer</button>
                  </form>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
    </table>
    <!-- PROPERTY & CONTACT -->
    <transition name="fade-menu">
      <!-- TYPE => CONTACT/PROPERTY ... CONTACT => CONTACT_OBJ ... PPOPERTYid => PPOPERTYid
      HIDE => HIDE_ON_CLICK OR ESC ... v-if showProperty => check if params is valid -->
      <property-component :type="type" :contact="contact" :propPropertyId="propertyId" @hide="hide" v-if="showProperty"></property-component>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import AdminDetailVue from './AdminDetail.vue'
import NotificationVue from '../Notification.vue'
export default {
  name: 'AdminContact',
  // COMPONENTS
  components: {
    'property-component': AdminDetailVue,
    'notif-delete-success': NotificationVue
  },
  // DATA
  data () {
    return {
      contacts: [],
      contact: {},
      showProperty: false,
      showContact: false,
      propertyId: '',
      isChecked: false,
      loading: false,
      showNotif: false
    }
  },
  // METHODS
  methods: {
    // DELETE PROPERTY HANDLE BUTTON
    async deleteProperty (params) {
      let idx = 0
      // notif flash message
      const notif = document.querySelector('.delete-notif')
      // find propertyId idx
      this.contacts.forEach(el => {
        // eslint-disable-next-line
        el._id === params ? idx = this.contacts.indexOf(el):{}
      })
      // run animation
      // first run loading
      this.loading = true
      await setTimeout(async () => {
        // wait 1000ms of waiting and cut wait anime
        // run server side operation
        try {
          const response = await axios({
            url: `http://localhost:5000/api/delete-contact/${params}`,
            method: 'DELETE'
          })
          // stop loading screen and lunch next anime => flashing success delete message if delete success
          this.loading = false
          // 1000ms
          setTimeout(() => {
            notif.classList.replace('delete-notif-hidden', 'delete-notif-show')
          }, 200)
          this.contacts.splice(idx, 1)
          setTimeout(() => {
            notif.classList.replace('delete-notif-show', 'delete-notif-hidden')
          }, 2000)
          console.log(response.data)
        } catch (error) {
          console.log(error)
          this.loading = false
        }
      }, 1000)
    },
    // CHECKING ORDER || valid an order
    async checkContact (contact) {
      try {
        // run loading screen
        // lunch axios
        contact.pending = false
        await axios({
          url: 'http://localhost:5000/api/valid-contact',
          method: 'PUT',
          data: contact
        })
        this.loading = true
        await setTimeout(() => {
          this.loading = false
        }, 1000)
      } catch (error) {
        console.log(error)
        contact.pending = true
      }
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
/* STYLING CUSTOM DELETE NOTIF */
  p {
    margin: 0;
  }
  .delete-notif {
    color: white;
    position: fixed;
    display: flex;
    align-items: center;
    flex-direction: column;
    left:0;
    width: 100%;
    transition: all 500ms ease-in;
  }
  .delete-notif-hidden {
    opacity: 0;
    top: -100px;
  }
  .delete-notif-show {
    top: 20px;
    opacity: 1;
  }
  #delete-notif-content {
    font-weight: 900;
    padding: 15px;
    background-color: rgba(226, 43, 89, 0.685);
  }
/* LOADING SCREEN */
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.658);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
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
