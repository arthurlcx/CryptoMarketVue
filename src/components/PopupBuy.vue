<template>
    <v-dialog max-width="700" transition="dialog-bottom-transition" v-model="dialog">
        <v-btn  large fab fixed right bottom slot="activator" class="success mx-5 mb-3 elevation-5">
            <v-icon>attach_money</v-icon>
        </v-btn>
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title><span class="headline">Buy</span></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-layout>
                        <v-flex md12>
                            <p class="title primary--text">Currency</p>
                            <v-divider></v-divider>
                            <div class="py-3">
                                <v-avatar size="42px" class="mr-3">
                                    <img :src="`https://static.coincap.io/assets/icons/${ coinDetail.symbol.toLowerCase() }@2x.png`" alt>
                                </v-avatar>
                                <span class="title white--text">{{ coinDetail.name }}</span>
                            </div>

                            <p class="title primary--text">Payment Method</p>
                            <v-divider></v-divider>
                            <v-select :items="paymentMethod" solo class="my-3" prepend-icon="payment" v-model="selected"></v-select>

                            <p class="title primary--text">Amount</p>
                            <v-divider></v-divider>
                            <v-text-field class="my-3 d-inline-block" outline v-model="coinPrice" @change="updateUnit"></v-text-field>
                            <span class="subtitle-1 ml-2">USD</span>
                            <v-icon class="mx-3">swap_horiz</v-icon>
                            <v-text-field class="my-3 d-inline-block" outline v-model="coinUnit" type="number" @change="updatePrice"></v-text-field>
                            <span class="subtitle-1 mx-2">{{ coinDetail.symbol }}</span>

                            <v-btn block color="primary" @click="buyCoin">Buy {{ coinDetail.name }} - $ {{ this.coinPrice }}</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import db from '../firebase'
import firebase from 'firebase'

export default {
    props: {
        coinDetail: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dialog: false,
            selected: 'Credit/Debit Card',
            paymentMethod: ['Credit/Debit Card', 'JomPay', 'PayPal'],
            coinUnit: 0,
            coinPrice: 0,
            userUid: null
        }
    },
    methods: {
        updatePrice() {
            this.coinPrice = this.roundOff(this.coinUnit * this.coinDetail.priceUsd)
        },
        updateUnit() {
            this.coinUnit = this.coinPrice / this.coinDetail.priceUsd
        },
        roundOff(price) {
            return (price).toFixed(2)
        },
        buyCoin() {
            var date = new Date()

            const portfolio = {
                coinName: this.coinDetail.name,
                coinId: this.coinDetail.id,
                coinSymbol: this.coinDetail.symbol,
                unitPrice: this.coinDetail.priceUsd,
                coinPrice: this.coinPrice,
                coinUnit: this.coinUnit,
                time: date.toLocaleString(),
                uid: this.userUid
            }

            db.collection('portfolio').add(portfolio).then(() => {
                this.dialog = false
            })
        },
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.userUid = user.uid
            } else {
                // No user is signed in.
            }
        });
    }
}
</script>

<style>

</style>
