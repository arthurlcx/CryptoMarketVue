<template>
    <div>
        <h1 class="headline font-weight-bold text-uppercase ma-5 align-center" align="center">Cryptocurrency Market</h1>

        <template>
            <v-text-field class="searchBox" v-model="search" label="Search Coins" prepend-icon="search"></v-text-field>

            <v-data-table
                :headers="headers"
                :items="coins"
                class="elevation-1"
                :pagination.sync="pagination"
                :search="search"
                :loading="loading"
            >

            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.rank }}</td>
                <td class="text-xs-left">
                    <v-avatar size="36px" class="mr-3">
                        <img :src="`https://static.coincap.io/assets/icons/${ props.item.symbol.toLowerCase() }@2x.png`" alt>
                    </v-avatar>
                    <router-link exact :to="`coin/${ props.item.id }`">{{ props.item.name }}</router-link>
                </td>
                <td class="text-xs-right">${{ commarize(props.item.priceUsd) }}</td>
                <td class="text-xs-right">${{ commarize(props.item.marketCapUsd) }}</td>
                <td class="text-xs-right">${{ commarize(props.item.vwap24Hr) }}</td>
                <td class="text-xs-right">{{ commarize(props.item.supply) }}</td>
                <td class="text-xs-right">${{ commarize(props.item.volumeUsd24Hr) }}</td>
                <td :class="{'text-xs-right red--text' : props.item.changePercent24Hr < 0 , 'text-xs-right green--text' : props.item.changePercent24Hr > 0}">{{ commarize(props.item.changePercent24Hr) }}%</td>
            </template>
        </v-data-table>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return{
            headers: [
                { text: 'Rank',align: 'left',value: 'rank'},
                { text: 'Name', value: 'name', align: 'left'},
                { text: 'Price', value: 'price', align: 'right'},
                { text: 'Market Cap', value: 'marketCapUsd', align: 'right'},
                { text: 'VWAP(24Hr)', value: 'vwap24Hr', align: 'right'},
                { text: 'Supply', value: 'supply', align: 'right'},
                { text: 'Volumne(24Hr)', value: 'volumeUsd24Hr', align: 'right'},
                { text: 'Change', value: 'changePercent24Hr', align: 'right'}
            ],
            pagination:
            {
                rowsPerPage: -1,
                sortBy: 'rank'
            },
            coins: [],
            value: 0,
            search: '',
            link: '',
            loading: true
        }
    },
    methods: {
        changeSort (column) {
            if (this.pagination.sortBy === column) {
            this.pagination.descending = !this.pagination.descending
            } else {
            this.pagination.sortBy = column
            this.pagination.descending = false
            }
        },
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
    mounted() {
        this.$http.get('https://api.coincap.io/v2/assets').then(function(data) {
            this.coins = data.body.data;
            this.loading = false;
        })
    }
}
</script>

<style scopped>
.searchBox {
    width: 350px
}
</style>
