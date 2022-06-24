<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../src/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      nightMode: false,
    }
  },
  methods: {
    darkMode() {
        this.nightMode = !this.nightMode
      }
    }
}
</script>

<template>
  <div :class="{ 'activeNight' : nightMode }">
    <header>
      <Navbar/>
      <label class="switch">
        <input type="checkbox" id="theme-toggle" :class="{ 'activeButtonNight' : !nightMode }" @click="darkMode" v-model="nightMode">
        <span class="slider round"></span>
      </label>
    </header>
    <RouterView />
  </div>
</template>

<style lang="scss">
@use "styles" as *;
@include globalStyle;
@include flexStyle;
@include nightMode;
@include toggleStyle;
</style>
