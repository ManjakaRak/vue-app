<template>
  <div class="main">
    <nav-component></nav-component>
    <ban-component></ban-component>
    <div  class="mt-5 main-container row">
      <section class="col-md-9">
        <div class="center">
          <div class="home">
            <div class="category">
              <p>
                {{property.category}}
              </p>
            </div>
            <div class="p-5 c">
              <div class="name-price">
                <h1><q>{{property.name}}</q></h1>
                <h1 class="text-danger">{{ formattedPrice }}</h1>
              </div>
              <hr class="hr-property">
              <div class="outside">
                <h3>Année de construction</h3>
                <h3><dt>{{ formatted_date }}</dt></h3>
              </div>
              <hr class="hr-property">
              <div class="outside">
                <h3>Surface</h3>
                <h3><dt>{{property.surface}} m<sup>2</sup></dt></h3>
              </div>
              <hr class="hr-property">
              <div class="outside">
                <h3>Localisation</h3>
                <h3><dt>{{property.location}}</dt></h3>
              </div>
              <hr class="hr-property">
              <div class="outside">
                <h3>Etage</h3>
                <h3><dt>{{property.stair}}</dt></h3>
              </div>
              <hr class="hr-property">
              <div class="outside">
                <h3>Chambre</h3>
                <h3><dt>{{property.room}}</dt></h3>
              </div>
              <hr class="hr-property">
              <div class="outside">
                <div>
                  <h3>Eau</h3>
                  <h3 class="text-center" v-if="property.water"><i class="text-info fas fa-check" aria-hidden="true"></i></h3>
                  <h3 class="text-center" v-else><i class="text-danger fas fa-times" aria-hidden="true"></i></h3>
                </div>
                <div>
                  <h3>Eléctricité</h3>
                  <h3 class="text-center" v-if="property.electricity"><i class="text-info fas fa-check" aria-hidden="true"></i></h3>
                  <h3 class="text-center" v-else><i class="text-danger fas fa-times" aria-hidden="true"></i></h3>
                </div>
                <div>
                  <h3>Climatisation</h3>
                  <h3 class="text-center" v-if="property.climatization"><i class="text-info fa fa-check" aria-hidden="true"></i></h3>
                  <h3 class="text-center" v-else><i class="text-danger fas fa-times" aria-hidden="true"></i></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <aside class="col-md-3">
        <div class="aside-content">
          <h4>Aside</h4>
          <hr class="separator">
          <ul>
            <li><a href="#">Lorem, ipsum.</a></li>
            <li><a href="#">Lorem, ipsum dolor.</a></li>
            <li><a href="#">Lorem</a></li>
            <li><a href="#">Lorem ipsum dolor sit.</a></li>
          </ul>
        </div>
        <div class="contact">
          <h4 class="text-center text-danger">Contact</h4>
          <form @submit.prevent="handleContactForm">
            <div class="row">
              <div class="col-xl">
                <input v-model="contact.name" type="text" name="first_name" placeholder="votre nom *" id="first-name">
                <small v-if="contactError.name.check">{{contactError.name.msg}}</small>
              </div>
              <div class="col-xl">
                <input v-model="contact.lastName" type="text" name="last_name" placeholder="votre prénom *" id="last-name">
                <small v-if="contactError.lastName.check">{{contactError.lastName.msg}}</small>
              </div>
            </div>
            <div class="row">
              <div class="col-xl">
                <input v-model="contact.tel" type="text" name="tel" id="tel" placeholder="votre numéro de téléphone *">
                <small v-if="contactError.tel.check">{{contactError.tel.msg}}</small>
              </div>
              <div class="col-xl">
                <input v-model="contact.email" type="text" name="email" placeholder="votre@email *" id="email">
                <small v-if="contactError.email.check">{{ contactError.email.msg }}</small>
              </div>
            </div>
            <textarea v-model="contact.message" type="text" name="message" placeholder="votre message *" id="message"></textarea>
            <p class="text-center">
              <small class="help-text">* Obligatoire</small>
            </p>
            <input type="hidden" :value="property._id">
            <input type="submit" class="btn btn-danger" value="Envoyer">
          </form>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import Ban from './Ban.vue'
import NavBar from './Navbar.vue'
import axios from 'axios'
export default {
  name: 'Detail',
  data () {
    return {
      property: {},
      contact: {},
      contactError: {
        name: {check: false},
        lastName: {check: false},
        tel: {check: false},
        email: {check: false}
      }
    }
  },
  components: {
    'ban-component': Ban,
    'nav-component': NavBar
  },
  methods: {
    loadProperty () {
      axios({
        url: `http://localhost:5000/api/property/${this.$route.params.id}`,
        method: 'GET'
      })
        .then(response => {
          this.property = response.data
        })
        .catch(_ => {
          this.$router.push('/')
        })
    },
    async handleContactForm () {
      this.contact.property = this.property
      await axios({
        url: 'http://localhost:5000/api/contact/add',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: this.contact
      })
        .then(data => {
          this.$router.push({name: 'Thanks', params: {check: true}})
        })
        .catch(error => {
          if (error.response.data.errors.name) {
            this.contactError.name.msg = 'Vous devez specifié votre nom'
            this.contactError.name.check = true
          } else {
            this.contactError.name.check = false
          }
          if (error.response.data.errors.lastName) {
            this.contactError.lastName.msg = 'Vous devez specifié votre prenom'
            this.contactError.lastName.check = true
          } else {
            this.contactError.lastName.check = false
          }
          if (error.response.data.errors.tel) {
            this.contactError.tel.msg = 'Vous devez specifié un numero de telephone'
            this.contactError.tel.check = true
          } else {
            this.contactError.tel.check = false
          }
          if (error.response.data.errors.email) {
            this.contactError.email.msg = 'Email obligatoire'
            this.contactError.email.check = true
          } else {
            this.contactError.email.check = false
          }
        })
        // this.contact.property.waiting = true
    }
  },
  computed: {
    formattedPrice () {
      // if (this.property.price) {
      let tab = Array.from(this.property.price + '')
      let j = 0
      for (let i = tab.length - 1; i >= 0; i--) {
        j = j + 1
        if (j % 3 === 0 && i !== 0) {
          tab[i] = '.' + tab[i]
        }
      }
      return tab.join('') + ' €'
      // }
      // return this.property.price
    },
    formatted_date () {
      const fd = new Date(this.property.construction_date)
      return fd.getFullYear()
    }
  },
  mounted () {
    this.loadProperty()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  small {
    color: crimson;
    font-size: 10px;
  }
  input[type="submit"] {
    border-radius: 0;
    width: 100%;
  }
  input:focus-visible, textarea:focus-visible {
    outline: none;
  }
  /* contact form */
  .contact {
    padding: 10px;
    background-color: white;
    box-shadow: 2px 2px 10px #111;
  }
  input:not(input[type="submit"]), textarea {
    padding: 8px 5px;
    border: none;
    border-bottom: 1px solid rgb(200, 35, 51);
    margin-bottom: 5px;
    width: 100%;
  }
  input:not(input[type="submit"]):focus, textarea:focus {
    background-color: rgba(112, 128, 144, 0.089);
  }
  /* home */
  dt {
    color: #00858a;
    font-weight: 500;
  }
  h3 {
    margin: 0;
  }
  .home .c div {
    padding: 10px;
  }
  .home .c div:not(.home .c div *):hover {
    background-color: rgba(187, 187, 187, 0.5);
    border-left: 5px solid #00858a;
    color: #00858a;
    padding-left: 5px;
  }
  .home {
    position: relative;
  }
  .category {
    position: absolute;
    right: 0;
    top: -8%
  }
  .category p {
    background-color: coral;
    padding: 10px;
    font-size: 2rem;
  }
  .hr-property {
    border: none;
    border-color: #7c7c7c;
    margin-bottom: 40px;
  }
  .name-price, .outside{
    display: flex;
    justify-content: space-between;
  }
  .home div h1 {
    color: #7c7c7c;
  }
  .home div h3 {
    color: #7c7c7c;
  }
  #property-name {
    position: relative;
    text-align: center;
  }
  #property-name::after {
    position: absolute;
    /*background: linear-gradient(#fff #111);*/
    border-bottom: 3px solid;
    border-right: 200px solid;
    content: "";
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .item-container {
    text-align: center;
  }
  .col-sm-4 {
    padding: 0;
  }
  .col-md-8{
    padding-right: 0px
  }
  .card {
    margin: 20px;
    padding: 0;
    width: auto;
  }
  .main-container {
    width: 100.6%;
  }
  .main {
    background-color: rgb(236, 236, 236);
  }
  .center {
    background-color: white;
    margin: 40px 10px;
    padding: 20px;
    box-shadow: 1px 1px 8px grey;
  }
  .item {
    margin-bottom: 20px;
  }
  h1 {
    margin: 0;
  }
  hr {
    margin: 0;
    /* border: 1px solid ; */
  }

  /* aside */
  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .aside-content:hover {
    background-color: #001530;
    /* font-size: 18px; */
  }
  .aside-content {
    margin: 15px;
    width: 100%;
    transition: all 200ms ease-out;
    padding: 20px 10px ;
    background-color: #1b3558;
    color: rgb(241, 244, 255);
    font-size: 14px;
  }
  .aside-content h4 {
    text-align: center;
    color: rgb(255, 255, 255);
    font-family: 'AnjaliOldLipi';
  }
  .aside-content hr {
    background-color:white;
  }
  .aside-content ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    margin: 0;
  }
  .aside-content ul li a {
    transition: all 200ms ease;
    padding: 10px 0;
    width: auto;
    height: auto;
  }
  .aside-content ul li a:hover {
    color: #dc3545;
    font-size: 20px;
    text-decoration: none;
  }
  @media screen and (max-width:804px) {
    .card {
      margin: 10px;
      width: 100%;
    }
  }
  @media screen and (max-width:550px) {
    .name-price, .outside{
      flex-direction: column;
    }
    .category {
      top: -6%
    }
    .col-md-9, .col-md-3 {
      padding: 0;
      margin-left: 25px;
    }
    .center {
      margin: 0;
    }
    input {
      overflow: scroll;
    }
  }
  @media screen and (max-width:550px) {
    .outside div:not(.outside div *) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
