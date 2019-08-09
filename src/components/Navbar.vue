<template>
    <nav>
        <v-toolbar app>
            <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="mt-2">
                <v-avatar tile class="mr-2">
                    <img src="../assets/logo-white.png" alt="">
                </v-avatar>
                <span class="display-1 font-weight-light">Crypto</span>
                <span class="display-1 text-uppercase primary--text">Market</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <div v-if="!loginStatus">
                <v-btn outline round color="primary" router to="/login">
                    <span class="white--text px-3">Log In</span>
                </v-btn>
                <v-btn color="primary" router to="/Login">
                    <span class="white--text">Join For Free</span>
                </v-btn>
            </div>

            <div v-if="loginStatus">

                <v-menu offset-y>
                    <v-btn flat slot="activator" color="primary">
                        <v-icon left >person</v-icon>
                        <span>{{ user.displayName }}</span>
                    </v-btn>
                    <v-list>
                        <v-list-tile v-for="userLink in userLinks" :key="userLink.text" router :to="userLink.route">
                            <v-list-tile-title>{{ userLink.text }}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="signOut">
                            <v-list-tile-title class="primary--text">Sign Out</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </div>

            

            
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app class="primary">
            <v-layout column align-venter>
                <v-flex class="mt-5">
                    <v-avatar size="100">

                    </v-avatar>
                </v-flex>
            </v-layout>

            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

        </v-navigation-drawer>
        
        <v-snackbar v-model="snackbar" :timeout="4000" top color="primary">
            <span>{{ snackbarText }}</span>
            <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>

        
    </nav>
</template>

<script>
import firebase from 'firebase'

export default {
    data (){
        return{
            links: [
                {icon: 'toll', text: 'Coin', route:'/'},
                {icon: 'euro_symbol', text: 'Portfolio', route:'/portfolio'},
                {icon: 'store', text: 'Marketplace', route:'/marketplace'},
            ],
            userLinks: [
                {text: 'My Portfolio', route:'/portfolio'},
                {text: 'My Account', route:'/user'}
            ],
            drawer: false,
            snackbar: false,
            snackbarText: '',
            loginStatus: false,
            user: []
        }
    },
    methods: {
        signOut() {
            firebase.auth().signOut().then(() => {
                this.snackbarText = "Goodbye " + this.user.displayName + "! See you soon!"
                this.snackbar = true
            }).catch(function(error) {
                alert('Opps, ' + error.message)
            });
        }

    },
    created () {
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            this.loginStatus = true
            if (user != null){
                this.user = user
                if (this.user.displayName != null){
                    this.snackbarText = "Welcome back! " + this.user.displayName
                } else {
                    this.snackbarText = "Welcome! "
                }
                this.snackbar = true
            }
        } else {
            // No user is signed in.
            this.loginStatus = false
        }
    });
    }
}
</script>

<style scopped>

</style>
