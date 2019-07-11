<template>
    <nav>
        <v-toolbar app>
            <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <span class="font-weight-light">Crypto</span>
                <span class="text-uppercase grey--text">Market</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu offset-y>
                <v-btn flat slot="activator" color="grey">
                    <v-icon left>expand_more</v-icon>
                    <span>Menu</span>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-tile-title>{{ link.text }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

            <v-btn flat color="grey">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
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
                {icon: 'compare_arrows', text: 'Exchanges', route:'/exchanges'},
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
