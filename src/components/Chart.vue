<template>
    <p>chart</p>
</template>

<script>
export default {
    data() {
        return{
            id: this.$route.params.id,
            coinHistory: [],
            interval: 'd1'
        }
    },
    methods: {
        httpGet: function(){
            this.$http.get('api.coincap.io/v2/assets/' + this.id + 'bitcoin/history?interval=' + this.interval).then(function(data) {
            this.coinDetail = data.body.data;
            console.log(data);
        })
        }
    },
    created() {
        this.httpGet;
    }
}
</script>

<style>

</style>
