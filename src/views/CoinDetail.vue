<template>
    
</template>

<script>
export default {
    data(){
        return{
            id: this.$route.params.id,
            coinDetail: []
        }
    },
    created() {
        this.$http.get('https://api.coincap.io/v2/assets/' + this.id).then(function(data) {
            this.coinDetail = data.body.data;
        })
    }

}
</script>

<style>

</style>
