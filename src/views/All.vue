<template>
    <v-layout>
        <v-app-bar color="teal-darken-4" v-show="isLogged">

            <template v-slot:prepend>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>



            <v-card-text>
                <v-text-field density="compact" variant="solo" label="Buscar" append-inner-icon="mdi-magnify" single-line
                    hide-details>
                </v-text-field>
            </v-card-text>

            <v-spacer></v-spacer>

            <v-btn icon @click="LogOut">
                <v-icon>mdi-login</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row dense>

                </v-row>
            </v-container>
        </v-main>
    </v-layout>
</template>
<script lang="ts" setup>

import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

let isLogged = false

const LogOut = () => {
    sessionStorage.setItem('cookie', '')
    router.push('/')
}

onBeforeMount(() => {
    let token = sessionStorage.getItem('cookie')
    if (!token) {
        router.push('/')
    } else {
        isLogged = true
    }
})

</script>