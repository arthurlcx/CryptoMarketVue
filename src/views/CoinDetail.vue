<template>
    <v-container text-center>
        <v-layout class="elevation-5 py-3 px-5" row wrap>
            <v-flex xs12 sm6 md1>
                <v-avatar class="mt-4 pr-3" size="70">
                    <img :src="`https://static.coincap.io/assets/icons/${ coinDetail.symbol.toLowerCase() }@2x.png`" alt="">
                </v-avatar>
            </v-flex>
            <v-flex xs12 sm6 md5>
                <div class="d-inline-block">
                    <p class="display-1 my-3 font-weight-bold">{{ coinDetail.name }} ({{ coinDetail.symbol }})</p>
                    <span class="headline mr-5">${{ commarize(coinDetail.priceUsd) }}</span>
                    <span :class="{'headline red--text' : coinDetail.changePercent24Hr < 0, 'headline green--text' : coinDetail.changePercent24Hr > 0}">{{ commarize(coinDetail.changePercent24Hr) }}</span>
                    <v-icon color="green" v-if="coinDetail.changePercent24Hr > 0">trending_up</v-icon>
                    <v-icon color="red" v-if="coinDetail.changePercent24Hr < 0">trending_down</v-icon>
                </div>
            </v-flex>
            <v-flex xs6 md2>
                <p class="title font-weight-thin my-3">Market Cap</p>
                <p class="headline">${{ commarize(coinDetail.marketCapUsd) }}</p>
            </v-flex>
            <v-flex xs6 md2>
                <p class="title font-weight-thin my-3">Volume (24Hr)</p>
                <p class="headline">${{ commarize(coinDetail.volumeUsd24Hr) }}</p>
            </v-flex>
            <v-flex xs6 md2>
                <p class="title font-weight-thin my-3">Supply</p>
                <p class="headline">{{ commarize(coinDetail.supply) }} {{ coinDetail.symbol }}</p>
            </v-flex>
        </v-layout>

        <v-layout class="my-3">
            <line-chart :chart-data="priceUsd" :chart-labels="time" :options="options"/>
        </v-layout>
    </v-container>
</template>

<script>
import LineChart from '../components/Chart.vue'

export default {
    components: {
        LineChart
    },
    data(){
        return{
            id: this.$route.params.id,
            coinDetail: [],
            value : 0,
            priceUsd: [],
            time: [],
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            interval: 'd1'
        }
    },
    methods: {
        commarize(strValue) {
            this.value = parseFloat(strValue);
            // Alter numbers larger than 1k
            if (this.value >= 1e3) {
            var units = ["k", "m", "b", "t"];
            
            // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
            let unit = Math.floor(((this.value).toFixed(0).length - 1) / 3) * 3
            // Calculate the remainder
            var num = (this.value / ('1e'+unit)).toFixed(2)
            var unitname = units[Math.floor(unit / 3) - 1]
            
            // output number remainder + unitname
            return num + unitname
            }
            
            // return formatted original number
            return this.value.toLocaleString()
        }
    },
    created() {
        this.$http.get('https://api.coincap.io/v2/assets/' + this.id).then(function(data) {
            this.coinDetail = data.body.data;
        });

        this.$http.get('https://api.coincap.io/v2/assets/' + this.id + '/history?interval=' + this.interval).then(function(data) {
            this.priceUsd = data.body.data.map(entry => entry.priceUsd);
            this.time = data.body.data.map(entry => entry.time);
        });

    }

}
</script>

<style>

</style>
