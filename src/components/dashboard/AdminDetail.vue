<template>
<!-- CHOOOSE ON SELECTION ACCORDING TO COMPONENT PARAMS VIA PARENT COMPONENT  -->
  <div id="property" @click="hide">
    <!-- SHOW PROPERTY -->
    <section v-if="propertySection" @click="stopPropagation">
      <div class="center">
        <div class="home">
          <div class="category">
            <p>
              {{property.category}}
            </p>
          </div>
          <div class="c">
            <div class="name-price">
              <h3><q>{{property.name}}</q></h3>
              <h3 class="text-danger">{{ formattedPrice }}</h3>
            </div>
            <hr class="hr-property">
            <div class="outside">
              <h4>Année de construction</h4>
              <h4><dt>{{ formatted_date }}</dt></h4>
            </div>
            <hr class="hr-property">
            <div class="outside">
              <h4>Surface</h4>
              <h4><dt>{{property.surface}} m<sup>2</sup></dt></h4>
            </div>
            <hr class="hr-property">
            <div class="outside">
              <h4>Localisation</h4>
              <h4><dt>{{property.location}}</dt></h4>
            </div>
            <hr class="hr-property">
            <div class="outside">
              <h4>Etage</h4>
              <h4><dt>{{property.stair}}</dt></h4>
            </div>
            <hr class="hr-property">
            <div class="outside">
              <h4>Chambre</h4>
              <h4><dt>{{property.room}}</dt></h4>
            </div>
            <hr class="hr-property">
            <div class="outside">
              <div>
                <h4>Eau</h4>
                <h4 class="text-center" v-if="property.water"><i class="text-info fas fa-isProperty" aria-hidden="true"></i></h4>
                <h4 class="text-center" v-else><i class="text-danger fas fa-times" aria-hidden="true"></i></h4>
              </div>
              <div>
                <h4>Eléctricité</h4>
                <h4 class="text-center" v-if="property.electricity"><i class="text-info fas fa-isProperty" aria-hidden="true"></i></h4>
                <h4 class="text-center" v-else><i class="text-danger fas fa-times" aria-hidden="true"></i></h4>
              </div>
              <div>
                <h4>Climatisation</h4>
                <h4 class="text-center" v-if="property.climatization"><i class="text-info fa fa-isProperty" aria-hidden="true"></i></h4>
                <h4 class="text-center" v-else><i class="text-danger fas fa-times" aria-hidden="true"></i></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- SHOW CONTACT -->
    <section v-if="contactSection" @click="stopPropagation">
      <div class="center">
        <h3 class="display-4">Contact</h3>
        <hr class="mb-3">
        <p>{{this.contactObj.name}} {{this.contactObj.lastName}}</p>
        <hr>
        <p>{{this.contactObj.tel}}</p>
        <hr>
        <p>{{this.contactObj.email}}</p>
        <hr class="mb-1">
        <p v-if="this.contactObj.message"><q>{{this.contactObj.message}}</q></p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminDetail',
  props: [
    'propPropertyId', // PROPERTY PARAMS
    'contact', // CONTACT PARAMS
    'type'// PROPERTY OR CONTACT
  ],
  data () {
    return {
      contactObj: this.contact,
      property: {},
      propertyId: this.propPropertyId,
      contactSection: false,
      propertySection: false
    }
  },
  methods: {
    async loadContact () {
      console.log('contact')
    },
    async loadProperty () {
      const response = await axios({
        // affect props['propertyId'] to server for handling right property
        url: `http://localhost:5000/api/admin/property/${this.propertyId}`,
        method: 'GET'
      })
      this.property = response.data
    },
    // HIDE PROPERTY
    hide () {
      // emit parent component (contact_list)
      this.$emit('hide')
    },
    stopPropagation (e) {
      e.stopPropagation()
    },
    check () {
      // AFFECTING PROPS TO DATA (PROPS CANT BE MUTATED)
      if (this.type === 'property') {
        this.loadProperty()
        this.propertySection = true
      } else {
        this.contactSection = true
      }
    }
  },
  computed: {
    formattedPrice () {
      let tab = Array.from(this.property.price + '')
      let j = 0
      for (let i = tab.length - 1; i >= 0; i--) {
        j = j + 1
        if (j % 3 === 0 && i !== 0) {
          tab[i] = '.' + tab[i]
        }
      }
      return tab.join('') + ' €'
    },
    formatted_date () {
      const fd = new Date(this.property.construction_date)
      return fd.getFullYear()
    }
  },
  mounted () {
    // CHECK THE PROPS IN THE MOUNTED HOOK
    this.check()
    // CLOSE SECTION ON 'ESC' PRESSING BUTTON
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.hide()
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    margin: 0;
  }
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
  /* home */
  dt {
    color: #00858a;
    font-weight: 500;
  }
  h3 {
    margin: 0;
  }
  .home .c div {
    padding: 5px;
  }
  .home .c div:not(.home .c div *):hover {
    /* background-color: rgba(187, 187, 187, 0.5); */
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
    font-size: 1rem;
  }
  .hr-property {
    border: none;
    border-color: #7c7c7c;
    margin-bottom: 10px;
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
  /* PROPERTY CONTAINER */
  #property {
    background-color: rgba(0, 0, 0, 0.774);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-basis: row;
    justify-content: center;
  }
  /* CONTENT */
  .center {
    background-color: white;
    padding: 20px;
    box-shadow: 1px 1px 8px grey;
    width: 500px;
    z-index: 10000;
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
