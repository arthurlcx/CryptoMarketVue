<template>
  <v-container class="my-5">
     <v-expansion-panel>
       <v-expansion-panel-content v-for="portfolioItem in portfolio" :key="portfolioItem.time">
         <div slot="header">
            <v-avatar>
                <img :src="`https://static.coincap.io/assets/icons/${ convertLowerCase(portfolioItem.coinSymbol) }@2x.png`" alt="">
            </v-avatar>
            <span class="ml-3 headline">{{ portfolioItem.coinUnit }}</span>
            <span class="ml-2 title primary--text">{{portfolioItem.coinSymbol}}</span>
        </div>
        <v-card-text class="px-4 grey--text">
            <p class="subtitle-1">Currency: <span class="title primary--text mx-2">{{ portfolioItem.coinName }}</span></p>
            <p class="subtitle-1">Coin Unit: <span class="title primary--text mx-2">{{ portfolioItem.coinUnit }}</span></p>         
            <p class="subtitle-1">Bought at: <span class="title primary--text mx-2">${{ portfolioItem.unitPrice }}/{{ portfolioItem.coinSymbol }}</span></p>
            <p class="subtitle-1">Total Cost: <span class="title primary--text mx-2">${{ portfolioItem.coinPrice }}</span></p>
            <p class="subtitle-1">Time purchase: <span class="title primary--text mx-2">{{ portfolioItem.time }}</span></p>
        </v-card-text>
       </v-expansion-panel-content>
     </v-expansion-panel>
   </v-container>
</template>

<script>
import db from '../firebase'
import firebase from 'firebase'
import { VExpansionPanel, VExpansionPanelContent } from 'vuetify'

export default {
    data() {
        return {
            id: null,
            portfolio: []
        }
    },
    methods: {
        readData() {
            db.collection('portfolio').where('uid', '==', this.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    this.portfolio.push(doc.data())
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        },
        convertLowerCase(string) {
            return string.toLowerCase()
        }
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.id = user.uid
                this.readData()
            }
            if (user != null){

            } else {
                // No user is signed in.
            }
        });
        

    }
}
</script>

<style>

</style>
