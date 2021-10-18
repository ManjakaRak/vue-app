<template>
  <div class="create-property">
    <nav-component></nav-component>
    <ban-component></ban-component>
    <form @submit.prevent="handleSubmit" class="container mb-5">
      <h2 class="display-4 mt-5">Ajouter un propriété</h2>
      <div class="row">
        <div class="form-group col-md-12">
          <!-- nom -->
          <input :class="{'error': errors.name.check}" v-model="property.name" type="text" class="default" placeholder="Nom *">
          <small v-if="errors.name.check" class="text-danger">
            {{ errors.name.message }}
          </small>
        </div>
        <div class="form-group col-md-6">
          <!-- date de construction -->
          <label>Date de construction</label><input :class="{'error': errors.construction_date.check}" v-model="property.construction_date" type="date" class="default">
          <small v-if="errors.construction_date.check" class="text-danger">
            {{ errors.construction_date.message }}
          </small>
        </div>
        <div class="form-group col-md-6">
          <!-- lieu -->
          <label>Localisation</label><input :class="{'error': errors.location.check}" v-model="property.location" type="text" placeholder="Lieu ou Adresse*" class="default">
          <small v-if="errors.location.check" class="text-danger">
            {{ errors.location.message }}
          </small>
        </div>
        <div class="form-group col-md-12">
          <!-- prix -->
          <label >Prix</label><input :class="{'error': errors.price.check}" v-model="property.price" placeholder="€" type="number">
          <small v-if="errors.price.check" class="text-danger">
            {{ errors.price.message }}
          </small>
        </div>
      </div>
      <fieldset class="">
        <legend>Spécificité</legend>
        <div class="row">
          <div class="col-md-4 form-group">
          <!-- surface m2 -->
          <input type="number" :class="{'error': errors.surface.check}" v-model="property.surface" placeholder="Surface en m2 *">
          <small v-if="errors.surface.check" class="text-danger">
            {{ errors.surface.message }}
          </small>
          </div>
          <div class="col-md-4 form-group">
          <!-- etage -->
          <input type="number" :class="{'error': errors.stair.check}" v-model="property.stair" placeholder="Nombre d'etage *">
          <small v-if="errors.stair.check" class="text-danger">
            {{ errors.stair.message }}
          </small>
          </div>
          <div class="col-md-4 form-group">
            <!-- chambre -->
            <input :class="{'error': errors.room.check}" type="number" v-model="property.room" placeholder="Nombre de chambre *">
            <small v-if="errors.room.check" class="text-danger">
              {{ errors.room.message }}
            </small>
          </div>
          <div class="col-md-4 form-group text-center">
            <!-- eau -->
            <input type="checkbox" v-model="property.water"><label>Eau</label>
          </div>
          <div class="col-md-4 form-group text-center">
            <!-- elec -->
            <input type="checkbox" v-model="property.electricity"><label>Eléctricité</label>
          </div>
          <div class="col-md-4 form-group text-center">
            <!-- clim -->
            <input type="checkbox" v-model="property.climatization"><label>Climatisation</label>
          </div>
        </div>
      </fieldset>
      <fieldset class="">
        <legend>Categorie</legend>
        <div class="option row">
          <div @click="handleAchatSwitch" class="col-md-6">
            <h3 class="category" v-html="achatCategory" :class="{'achat-selected': achatSelected, 'achat':!achatSelected}"></h3>
          </div>
          <div @click="handleAllocationSwitch" class="col-md-6">
            <h3 class="category" v-html="allocationCategory" :class="{'allocation-selected': allocationSelected, 'allocation':!allocationSelected}"></h3>
          </div>
        </div>
        <small v-if="errors.category.check" class="text-danger">
          {{ errors.category.message }}
        </small>
      </fieldset>
      <div class="submit-btn">
        <button type="submit" class="btn btn-success" id="submit-btn">Enregistrer</button>
      </div>
    </form>
    <footer-component></footer-component>
  </div>
</template>

<script>
import axios from 'axios'
import Ban from './Ban.vue'
import Footer from './Footer'
import NavBar from './Navbar.vue'
export default {
  name: 'CreateProperty',
  components: {
    'ban-component': Ban,
    'footer-component': Footer,
    'nav-component': NavBar
  },
  data () {
    return {
      // storage of token
      token: null,
      achatSelected: false,
      achatCategory: 'Achat',
      allocationSelected: false,
      allocationCategory: 'Allocation',
      // form data
      property: {
        electricity: false,
        climatization: false,
        water: false
      },
      // create error obj and handle error
      errors: {
        name: {
          check: false
        },
        price: {
          check: false
        },
        surface: {
          check: false
        },
        construction_date: {
          check: false
        },
        location: {
          check: false
        },
        room: {
          check: false
        },
        stair: {
          check: false
        },
        category: {
          check: false
        }
      }
    }
  },
  methods: {
    // switching on command and allocation
    // ACHAT
    handleAchatSwitch () {
      if (!this.achatSelected) {
        if (this.allocationSelected) {
          this.allocationSelected = false
          this.allocationCategory = 'Allocation'
        }
        this.achatSelected = true
        this.achatCategory = '<i class="fa fa-check-circle" aria-hidden="true"></i> ' + this.achatCategory
        this.property.category = 'achat'
      } else {
        this.achatCategory = 'Achat'
        this.achatSelected = false
        this.property.category = null
      }
    },
    // ALLOCATION
    handleAllocationSwitch () {
      if (!this.allocationSelected) {
        if (this.achatSelected) {
          this.achatSelected = false
          this.achatCategory = 'Achat'
        }
        this.allocationSelected = true
        this.allocationCategory = '<i class="fa fa-check-circle" aria-hidden="true"></i> ' + this.allocationCategory
        this.property.category = 'allocation'
      } else {
        this.allocationSelected = false
        this.allocationCategory = 'Allocation'
        this.property.category = null
      }
    },
    // SUBMIT DATTA
    async handleSubmit () {
      await axios({
        // handle on server with axios
        method: 'post',
        url: 'http://localhost:5000/api/property/add',
        // url: 'http://localhost:7000/api/property/add',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        }, // set header for json handling
        data: this.property
      })
        .then((data) => {
          this.$router.push({name: 'Main', params: {message: 'Success'}})
        })
        .catch((error) => {
          // console.log(error)
          // CATCH ERROR FROM SERVER IF NOT VALID
          if (error.response.data.errors.name) {
            this.errors.name.message = 'Le nom ne doit pas etre vide'
            this.errors.name.check = true
          } else {
            this.errors.name.check = false
          }
          // handle price error
          if (error.response.data.errors.price) {
            this.errors.price.message = 'Le prix ne doit pas etre vide'
            this.errors.price.check = true
          } else {
            this.errors.price.check = false
          }
          // handle surface error
          if (error.response.data.errors.surface) {
            this.errors.surface.message = 'Specifié le surface du terrain'
            this.errors.surface.check = true
          } else {
            this.errors.surface.check = false
          }
          // handle construction date error
          if (error.response.data.errors.construction_date) {
            this.errors.construction_date.message = 'Specifié la date de construction'
            this.errors.construction_date.check = true
          } else {
            this.errors.construction_date.check = false
          }
          // handle location error
          if (error.response.data.errors.location) {
            this.errors.location.message = 'Specifié le lieu'
            this.errors.location.check = true
          } else {
            this.errors.location.check = false
          }
          // handle room error
          if (error.response.data.errors.room) {
            this.errors.room.message = 'Specifié le nombre de chambre'
            this.errors.room.check = true
          } else {
            this.errors.room.check = false
          }
          // handle stair error
          if (error.response.data.errors.stair) {
            this.errors.stair.message = 'Specifié le nombre d\'etage'
            this.errors.stair.check = true
          } else {
            this.errors.stair.check = false
          }
          // handle category error
          if (error.response.data.errors.category) {
            this.errors.category.message = 'Vous devez choisir entre les 2 options'
            this.errors.category.check = true
          } else {
            this.errors.category.check = false
          }
        })
    }
  },
  mounted () {
    this.token = window.localStorage.getItem('auth')
    if (!this.token) {
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
  input {
    width: 100%;
    padding: 5px;
    border: none;
    border-bottom: 1px solid rgb(200, 200, 200);
  }
  .create-property input:focus {
    background-color: #c7c7c763;
  }
  .create-property input:focus-visible {
    outline: none;
  }
  .error {
    border-color:transparent transparent salmon transparent;
  }
  .submit-btn {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .submit-btn button {
    padding: 15px;
    border-radius: 0;
    border: none;
    font-size: 20px;
  }
  .achat-selected {
    background-color: #1b3558;
    border: 2px solid #1b3558;
    color: white;
  }
  .allocation-selected {
    background-color: #dc3545;
    border: 2px solid #dc3545;
    color: white;
  }
  .category {
    padding: 20px;
    text-align: center;
    transition: all .3s;
    font-family: serif;
  }
  .category:hover {
    color: white;
    cursor: pointer;
  }
  .allocation {
    border: 2px solid #dc3545;
    color: #dc3545;
  }
  .allocation:hover {
    background-color: #dc3545;
  }
  .achat {
    border: 2px solid #1b3558;
    color: #1b3558
  }
  .achat:hover {
    background-color: #1b3558;
  }
  fieldset {
    border: 1px solid #ced4da;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    padding: 20px;
  }
  fieldset legend {
    width: auto;
    margin-left: 10px;
    color: #9d9e9d
  }
</style>
