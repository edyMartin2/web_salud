<template>
    <v-layout>
        <v-app-bar color="teal-darken-4" v-show="isLogged">
            <v-card-text>
                <v-text-field density="compact" variant="solo" label="Buscar" append-inner-icon="mdi-magnify" single-line
                    hide-details>
                </v-text-field>
            </v-card-text>

            <v-btn @click="SignIn" v-if="$vuetify.display.lgAndUp">
                Ingresar
            </v-btn>

            <v-btn @click="SignUp" v-if="$vuetify.display.lgAndUp" variant="outlined">
                Registrarme
            </v-btn>

        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row dense>
                    <ListServiceComponent></ListServiceComponent>
                </v-row>
            </v-container>
        </v-main>
    </v-layout>
</template>
<script lang="ts" setup>

import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import ListServiceComponent from '@/components/ListServiceComponent.vue';

const router = useRouter();

let isLogged = false

const LogOut = () => {
    sessionStorage.setItem('cookie', '')
    router.push('/')
}

const SignIn = ()=>{
    router.push('/signIn')
}

const SignUp = ()=>{
    router.push('signUp')
}

onBeforeMount(() => {
    let token = sessionStorage.getItem('cookie')
    if (!token) {
        //router.push('/')
        isLogged = true
    } else {
        isLogged = true
    }
})

</script>