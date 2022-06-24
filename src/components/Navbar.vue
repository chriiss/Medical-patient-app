<script>
import dataJson from "../data/dataBis.json";
export default {
    data() {
        return {
            datasJson: dataJson,
            nightMode: false
        }
    }
}
</script>


<template>
    <nav class="navbar d-flex">
        <div class="navbar-img" v-for="data in datasJson.imgComponent" :key="data.name" >
            <img :src="data.link" :alt="data.name"/>
        </div>
        <ul class="navbar-list" v-for="data in datasJson.navbarComponent" :key="data.name">
            <li class="navbar-list-li"><RouterLink active-class="active-link" exact-active-class="exact-active-link" :to="data.link">{{data.name}}</RouterLink></li>
        </ul>
        <div class="navbar-profile" v-for="data in datasJson.profileComponent" :key="data.name">
            <img :src="data.link" :alt="data.name"/>
        </div>
    </nav>
</template>

<style scoped lang="scss">
@use "../styles" as *;
@include navbarStyle;
</style>