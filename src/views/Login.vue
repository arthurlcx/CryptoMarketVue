<template>
    <v-container wrap fill-height>
        <v-layout align-center justify-center>
            <v-card class="elevation-12" min-width="600">
                <v-tabs grow="true">
                    <v-tab>Login</v-tab>
                    <v-tab>Register</v-tab>

                    <v-tab-item>
                        <v-form class="pa-5" ref="form" v-model="valid">
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                            <v-text-field
                                v-model="password"
                                :append-icon="show ? 'visibility' : 'visibility_off'"
                                :rules="[rules.required, rules.min]"
                                :type="show ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password"
                                hint="At least 8 characters"
                                counter
                                @click:append="show = !show"
                            ></v-text-field>
                            <v-btn class="mt-5" block color="primary" :loading="loading" @click="logIn">Log In</v-btn>
                        </v-form>
                    </v-tab-item>

                    <v-tab-item>
                        <v-form class="pa-5" ref="formReg" v-model="valid">
                            <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" required></v-text-field>
                            <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" required></v-text-field>
                            <v-text-field v-model="emailReg" :rules="emailRules" label="E-mail" required></v-text-field>
                            <v-text-field
                                v-model="passwordReg"
                                :append-icon="showReg ? 'visibility' : 'visibility_off'"
                                :rules="[rules.required, rules.min]"
                                :type="showReg ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password"
                                hint="At least 8 characters"
                                counter
                                @click:append="showReg = !showReg"
                            ></v-text-field>
                            <v-btn class="mt-5" block color="primary" :loading="loading" @click="register">Sign Up</v-btn>
                        </v-form>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
    data() {
        return {
            valid: true,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            },
            show: false,
            loading : false,
            firstName: '',
            lastName: '',
            emailReg: '',
            passwordReg: '',
            passwordRegCom: '',
            showReg: false,
            displayName: ''
        }
    },
    methods: {
        register: function() {
            if (this.$refs.formReg.validate()){
                this.loading = true
                firebase.auth().createUserWithEmailAndPassword(this.emailReg, this.passwordReg).then(
                    () => {
                        this.updateUserProfile()
                    },
                    function(error) {
                        // Handle Errors here.
                        alert('Opps' + error.message)
                    }
                );
            } else {
                alert('Invalid entries. Please check again.')
            }
        },
        updateUserProfile: function() {
            var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: this.firstName
            }).then(() => {
                this.loading = false
                this.$router.replace('/')
            }).catch(function(error) {
                alert(error.message)
            })
        },
        logIn: function() {
            if (this.$refs.form.validate()){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    () => {
                        this.loading = false
                        this.$router.replace('/');
                    },
                    function(error) {
                        //Handle Errors here
                        alert('error' + error.message);
                    }
                )
            }
        }
    }

}
</script>

<style>

</style>
