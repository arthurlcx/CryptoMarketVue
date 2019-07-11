<template>
    <div>
        <h1 class="headline orange--text ma-5">Coin</h1>

        <template>
            <v-data-table
                :headers="headers"
                :items="coins"
                class="elevation-1"
                :pagination.sync="pagination"
            >

            

            <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.rank }}</td>
                    <td class="text-xs-left">
                        <v-avatar size="36px" class="mr-3">
                            <img :src="`https://static.coincap.io/assets/icons/${ props.item.symbol.toLowerCase() }@2x.png`" alt="Avatar">
                        </v-avatar>
                        {{ props.item.name }}
                    </td>
                    <td class="text-xs-right">${{ props.item.priceUsd }}</td>
                    <td class="text-xs-right">${{ props.item.marketCapUsd }}</td>
                    <td class="text-xs-right">${{ props.item.vwap24Hr }}</td>
                    <td class="text-xs-right">{{ props.item.supply }}</td>
                    <td class="text-xs-right">${{ props.item.volumeUsd24Hr }}</td>
                    <td class="text-xs-right">{{ props.item.changePercent24Hr }}%</td>
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
                { text: 'Rank',align: 'left',value: 'Rank'},
                { text: 'Name', value: 'Name', align: 'left'},
                { text: 'Price', value: 'Price', align: 'right'},
                { text: 'Market Cap', value: 'Market Cap', align: 'right'},
                { text: 'VWAP(24Hr)', value: 'VWAP', align: 'right'},
                { text: 'Supply', value: 'supply', align: 'right'},
                { text: 'Volumne(24Hr)', value: 'volume', align: 'right'},
                { text: 'Change', value: 'change', align: 'right'}
            ],
            pagination:
            {
                rowsPerPage: -1,
                sortBy: 'rank'
            },
            coins: []
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
      }
    },
    created() {
        this.$http.get('https://api.coincap.io/v2/assets').then(function(data) {
            this.coins = data.body.data;
        })
    }
}
</script>

<style>

</style>
