<script>
import dataPatient from "../data/data.json";
import dataJson from "../data/dataBis.json";
import moment from 'moment'
export default {
  data() {
    return {
      dataPatients: dataPatient,
      datasJson: dataJson,
      dataSearch: "",
      sortBy: null,
      filteredPatients: [],
      modal: false
    }
  },
  methods: {
    formatDate(value) {
      if (value) {
        return moment(new Date(value)).format('DD/MM/YYYY')
      }
    },
    clearSearch() {
      this.dataSearch ="";
    },
    highLight(text) {
      return text.replace(new RegExp(this.dataSearch, 'gi'), '<mark>$&</mark>')
    },
    getAge(ageDate){
      const today = new Date();
      const birthDate = new Date(ageDate);
      let  age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))age = age--
      return age;
    },
    setState() {
      this.modal = false;
    }
  },
  computed: {
    searchPatient() {
      if(this.dataSearch.length == 0) {
        this.filteredPatients = this.dataPatients.documents
      }
      this.filteredPatients = this.dataPatients.documents.filter(data => {
        return (
          data.displayed_text.toLowerCase().includes(this.dataSearch.toLowerCase()) ||
          data.title.toLowerCase().includes(this.dataSearch.toLowerCase()) ||
          data.document_origin_code.toLowerCase().includes(this.dataSearch.toLowerCase()) ||
          data.document_type.toLowerCase().includes(this.dataSearch.toLowerCase()) ||
          data.document_date.toLowerCase().includes(this.dataSearch.toLowerCase())
        );
      })
    },
    filterSelect() {
      const sortTypes = {
        1: (a, b) => a.document_date > b.document_date ? -1 : 1,
        2: (a, b) => a.document_date > b.document_date ? 1 : -1,
        3: (a, b) => a.document_type > b.document_type ? -1 : 1,
        4: (a, b) => a.document_type > b.document_type ? 1 : -1,
        5: (a, b) => a.document_origin_code > b.document_origin_code ? -1 : 1,
        6: (a, b) => a.document_origin_code > b.document_origin_code ? 1 : -1,
        7: (a, b) => a.title > b.title ? -1 : 1,
        8: (a, b) => a.title > b.title ? 1 : -1,
      }
      this.filteredPatients = this.dataPatients.documents.sort(sortTypes[this.sortBy]);
    }
  }
}
</script>

<template>
<div class="home">
  <div class="patient-container d-flex margin-space-header">
    <div class="patient-container-children">
      <div class="d-flex">
        <h1>{{datasJson.patient}}</h1>
        <span class="text-space-bis text-space-breakpoint">#{{dataPatients.id}}</span>
      </div>
      <div class="margin-space">
        <span class="text-light text-transform">{{dataPatients.last_name}}&nbsp;</span>
        <span class="text-light">{{dataPatients.first_name}}</span>
      </div>
      <div class="margin-space">
        <span class="text-light">{{datasJson.born}}<span class="text-space">{{formatDate(dataPatients.birth_date.substring(0, 10))}}</span></span>
        <span class="text-space">{{dataPatients.sex}}</span>
      </div>
      <div class="margin-space">
        <span class="text-light">{{datasJson.death}}<span class="text-space">{{formatDate(dataPatients.death_date.substring(0, 10))}}</span>&nbsp;{{datasJson.to}}&nbsp;<span v-html='getAge(formatDate(dataPatients.birth_date.substring(0, 5)))'></span>&nbsp;{{datasJson.years}}</span>
      </div>
      <div class="margin-space">
        <span class="text-light text-transform">{{datasJson.ipp}} {{dataPatients.ipp}}</span>
      </div>
    </div>
    <div class="patient-container-children">
      <div class="patient-container-children-search d-flex">
        <input type="search" v-model.trim="dataSearch" autocomplete="off" @input="searchPatient" @focus="modal = true" class="search" :placeholder="datasJson.search"/>
        <button type="button" class="btn" @click="clearSearch">&#128473;</button>
      </div>
      <div v-if="filteredPatients && modal">
        <ul class="d-flex filter-color" v-for="filteredPatient in filteredPatients" :key="filteredPatient.id" @click="setState">
          <li>{{datasJson.type}}</li>
          <li class="mark" v-html="highLight(filteredPatient.document_type)"></li>
          <li>{{datasJson.origin}}</li>
          <li class="mark" v-html="highLight(filteredPatient.document_origin_code)"></li>
        </ul>
      </div>
    </div>
  </div>

  <nav class="navbar tabs d-flex j-content">
    <ul class="navbar-list" v-for="data in datasJson.tabsComponent" :key="data.name">
      <li class="navbar-list-li"><RouterLink active-class="active-link" exact-active-class="exact-active-link" :to="data.link">{{data.name}}</RouterLink></li>
    </ul>
  </nav>

  <h4><img src="/public/icon.png" class="icon" alt="icon" />{{filteredPatients.length}} {{datasJson.doc}}</h4>

  <div class="table" >
    <div>
      <div class="table-head d-flex">
        <div class="space d-flex">
          <label for="date">{{datasJson.date}}</label>
          <select name="date" v-model="sortBy" :change="filterSelect">
            <option :value="datasJson.valueOne">{{datasJson.recent}}</option>
            <option :value="datasJson.valueTwo">{{datasJson.odd}}</option>
          </select>
        </div>
        <div class="space d-flex">
          <label for="type">{{datasJson.type}}</label>
          <select name="type" v-model="sortBy" :change="filterSelect">
            <option :value="datasJson.valueThree">{{datasJson.alphabetZtoA}}</option>
            <option :value="datasJson.valueFour">{{datasJson.alphabetAtoZ}}</option>
          </select>
        </div>
        <div class="space d-flex">
          <label for="origin">{{datasJson.origin}}</label>
          <select name="origin" v-model="sortBy" :change="filterSelect">
            <option :value="datasJson.valueFive">{{datasJson.alphabetZtoA}}</option>
            <option :value="datasJson.valueSix">{{datasJson.alphabetAtoZ}}</option>
          </select>
        </div>
        <div class="space d-flex">
          <label for="apercu">{{datasJson.apercu}}</label>
          <select name="apercu" v-model="sortBy" :change="filterSelect">
            <option :value="datasJson.valueSeven">{{datasJson.alphabetZtoA}}</option>
            <option :value="datasJson.valueHeight">{{datasJson.alphabetAtoZ}}</option>
          </select>
        </div>
      </div>
    </div>
    <hr>
    <div v-for="data in filteredPatients" :key="data.id">
      <div  class="d-flex table-body">
        <div class="text-color-two table-middle" v-html="highLight(formatDate(data.document_date))"></div>
        <span><img src="/public/icon-array.png" class="icon icon-not-mobile" alt="icon"/></span><div class="text-color table-middle" v-html="highLight(data.document_type)"></div>
        <div class="text-color table-middle" v-html="highLight(data.document_origin_code)"></div>
        <div class="text-color-two table-middle">
          <div v-html="highLight(data.title)"></div>
          <div class="text-color table-middle" v-html="highLight(data.displayed_text.substring(0, 80).replace(/<\/?[^>]+>/gi, ''))"></div>
          <div>{{datasJson.tronc}}</div>
          <div>
            <router-link class="text-color btn-plus" :to="{ name: 'apercuDetails', params: { id: data.title, date: formatDate(data.document_date), type: data.document_type, origin: data.document_origin_code, data: data.displayed_text.replace(/<\/?[^>]+>/gi, '')}}">&#43;</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@use "../styles" as *;
@include textTransformStyle;
@include homeHeaderStyle;
@include navbarStyle;
@include jContentStyle;
@include homeTableStyle;
</style>