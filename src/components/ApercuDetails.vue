<script>
import router from '../router'
import dataJson from "../data/dataBis.json";
export default {
    data() {
        return {
            id: 0,
            text: 0,
            date: 0,
            type: 0,
            origin: 0,
            datasJson: dataJson,
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.date = this.$route.params.date;
        this.type = this.$route.params.type;
        this.origin = this.$route.params.origin;
        this.text = this.$route.params.data;
    },
}
</script>


<template>
    <div class="container-details">
        <div class="table">
            <div class="table-head d-flex margin-space">
                <div>{{datasJson.date}}</div>
                <div>{{datasJson.type}}</div>
                <div>{{datasJson.origin}}</div>
            </div>
            <div  class="d-flex table-body text-color">
                <div>{{ date }}</div>
                <div>{{ type }}</div>
                <div>{{ origin }}</div>
            </div>
        </div>

        <div class="apercu-details">
            <p>{{ id }}</p>
            <p class="top-space">{{ text }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../styles/" as *;
@include detailsStyle;
@include homeTableStyle;
</style>