<template>
  <div id="admin-properties">
    <!-- PROPERTY VIEW -->
    <property-component @hide="hide" v-if="showProperty" :propPropertyId="propertyId" :type="'property'"></property-component>
    <h3 class="text-danger">Administration des Propriétés</h3>
    <table class="table table-bordered table-inverse table-responsive">
      <thead class="thead-inverse">
        <tr>
          <th>Nom</th>
          <th>Vendu / Loué</th>
          <th>Indisponible</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="property in properties" :key="property._id">
            <td class="text-primary">{{property.name}}</td>
            <td><i :class="{'fa fa-times-circle text-danger': !property.sold, 'fa fa-check-circle text-success': property.sold}" aria-hidden="true"></i></td>
            <td><i v-if="property.waiting" class="fa fa-ellipsis-h text-primary" aria-hidden="true"></i></td>
            <td>
              <button class="btn btn-warning" @click="handleShowProperty(property._id)">Details</button>
              <button class="btn btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import AdminDetailVue from './AdminDetail.vue'
export default {
  name: 'AdminProperties',
  // PROPS
  components: {
    'property-component': AdminDetailVue
  },
  data () {
    return {
      properties: [],
      showProperty: false,
      propertyId: ''
    }
  },
  methods: {
    async loadAllProperties () {
      try {
        const token = window.localStorage.getItem('auth')
        const properties = await axios({
          url: 'http://localhost:5000/api/admin/properties',
          method: 'GET',
          headers: {
            'Authorization': token
          }
        })
        this.properties = properties.data
      } catch (error) {
        console.log(error)
      }
    },
    handleShowProperty (params) {
      this.propertyId = params
      this.showProperty = true
    },
    // HIDE PROPERTY BY SETTING showProperty ON FALSE
    hide () {
      this.showProperty = false
    }
  },
  mounted () {
    this.loadAllProperties()
  }
}
</script>

<style>
  td {
    text-align: center;
  }
</style>
