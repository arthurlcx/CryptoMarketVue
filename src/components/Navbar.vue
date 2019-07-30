<template>
    <nav>
        <v-toolbar app>
            <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="mt-2">
                <v-avatar tile>
                    <img src="../assets/logo-white.png" alt="">
                </v-avatar>
                <span class="display-1 font-weight-light">Crypto</span>
                <span class="display-1 text-uppercase primary--text">Market</span>
            </v-toolbar-title>

            <v-toolbar-items class="mx-4">
                <v-btn flat round v-for="link in links" :key="link.text" router :to="link.route" class="text-none">
                    {{ link.text }}
                </v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-btn outline round color="primary">
                <span class="white--text px-3">Log In</span>
            </v-btn>
            <v-btn color="primary">
                <span class="white--text">Join For Free</span>
            </v-btn>
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
    </nav>
</template>

<script>
export default {
    data (){
        return{
            links: [
                {icon: 'toll', text: 'Coin', route:'/'},
                {icon: 'euro_symbol', text: 'Wallet', route:'/wallet'},
                {icon: 'store', text: 'Marketplace', route:'/marketplace'},
            ],
            drawer: false,
        }
    }
}
</script>

<style scopped>

</style>
