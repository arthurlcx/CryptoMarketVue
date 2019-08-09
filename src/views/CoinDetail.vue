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

        <v-layout class="mt-5" >
            <v-flex grow>
                <line-chart v-if="loaded" :chart-data="priceUsd" :chart-labels="time" :options="options"/>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex grow>
                <v-btn round color="primary" v-for="intervalMod in intervalMods" :key="intervalMod.value" @click="requestHistoryData(intervalMod.value)">{{ intervalMod.text }}</v-btn>
            </v-flex>
        </v-layout>

        <template>
            <v-data-table
                v-if="loadedTable"
                :headers="headers"
                :items="market"
                class="elevation-5 mt-5"
                :loading="loadingTable"
                :pagination.sync="pagination"
                >

                <template v-slot:items="props">
                    <td class="text-xs-left">
                    {{ props.item.exchangeId }}
                    </td>
                    <td class="text-xs-right">{{ props.item.baseSymbol }}/{{ props.item.quoteSymbol }}</td>
                    <td class="text-xs-right">${{ commarize(props.item.priceUsd) }}</td>
                    <td class="text-xs-right">${{ commarize(props.item.volumeUsd24Hr) }}</td>
                    <td class="text-xs-right">${{ commarize(props.item.volumePercent) }} %</td>
                </template>
            </v-data-table>
        </template>

        <PopupBuy :coinDetail="coinDetail"></PopupBuy>

        
    </v-container>
</template>

<script>
import LineChart from '../components/Chart.vue'
import PopupBuy from '../components/PopupBuy.vue'

export default {
    components: { 
        LineChart,
        PopupBuy
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
            intervalMods: [
                {text: '1 Day', value: 'm1'},
                {text: '5 Days', value: 'm5'},
                {text: '1 Month', value: 'h1'},
                {text: '6 Moths', value: 'h6'},
                {text: '1 Year', value: 'h12'},
                {text: 'ALL', value: 'd1'},
            ],
            loading: false,
            loaded: false,
            market: [],
            headers: [
                { text: 'Exchange',value: 'exchangeId', align: 'left'},
                { text: 'Pair', value: 'baseSymbol', align: 'right'},
                { text: 'Price', value: 'priceUsd', align: 'right'},
                { text: 'Volume (24Hr)', value: 'volumeUsd24Hr', align: 'right'},
                { text: 'Volume (%)', value: 'volumePercent', align: 'right'}
            ],
            loadingTable: false,
            loadedTable: false,
            pagination:
            {
                rowsPerPage: -1,
                sortBy: 'volumeUsd24Hr',
                descending: true
            }
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
        },
        resetState () {
            this.loaded = false
        },
        requestHistoryData (interval) {
            this.resetState()
            this.loading = true
            try {
            this.$http.get('https://api.coincap.io/v2/assets/' + this.id + '/history?interval=' + interval).then((data) => {
                this.priceUsd = data.body.data.map(entry => entry.priceUsd)
                this.time = data.body.data.map(entry => this.convertEpoch(entry.time))
                this.loaded = true
                this.loading = false
            });
            } catch (e) {
                alert(e.message);
            }
        },
        convertEpoch (time) {
            var date = new Date(time)

            return date.toLocaleString()
        },
        requestMarket() {
            this.loadingTable = true
            this.loadedTable = false

            this.$http.get('https://api.coincap.io/v2/assets/' + this.id + '/markets').then((data) => {
                this.loadingTable = false
                this.loadedTable = true
                this.market = data.body.data;
            });
        }
    },
    created() {
        this.$http.get('https://api.coincap.io/v2/assets/' + this.id).then((data) => {
            this.coinDetail = data.body.data;
        });

    },
    mounted () {
        this.requestHistoryData('m1')
        this.requestMarket()
    }

}
</script>

<style>

</style>
