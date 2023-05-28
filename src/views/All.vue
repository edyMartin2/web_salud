<template>
    <v-layout>
        <v-app-bar color="teal-darken-4" v-show="isLogged">
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