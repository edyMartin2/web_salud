<template>
    <VCard>
        <VCardItem>
            <VCol cols="12" sm="12" style="text-align: center;">
                <h1>Inicie sesión</h1>
            </VCol>
            <VCol cols="12" sm="12">
                <VTextField :value="email" variant="outlined" label="Correo" v-model="email">
                </VTextField>
            </VCol>
            <VCol cols="12" sm="12">
                <VTextField :value="password" variant="outlined" type="password" label="Contraseña" v-model="password">
                </VTextField>
            </VCol>
            <VCol cols="12" style="text-align: center;" sm="12">
                <v-btn :disabled="loading" :loading="loading" block class="text-none mb-4" color="teal-darken-3"
                    size="x-large" variant="flat" @click="loading = !loading">
                    Iniciar secion
                </v-btn>

                <v-btn block class="text-none mb-4" color="red-accent-3"
                    size="x-large" variant="flat" @click="goToSignUp">
                    Crear cuenta
                </v-btn>

            </VCol>
            <VCol cols="12" sm="12">
                <v-snackbar v-model="loaddingErrorMessage">
                    {{ errorMessage }}
                    <template v-slot:actions>
                        <v-btn color="pink" variant="text" @click="loaddingErrorMessage = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </VCol>
        </VCardItem>
        <VCardActions style="text-align: center;">
            <VCol cols="12" style="text-align: center;" sm="12">
                <VBtn variant="outlined">
                    olvide mi Contraseña
                </VBtn>
            </VCol>
        </VCardActions>
    </VCard>
</template>

<script lang="ts">

import router from '@/router';
import { create } from 'domain';
import { defineComponent, PropType } from 'vue';

export default {

    props: {
        isFinished: {
            type: String as PropType<String>,
            required: false
        }
    },

    //datos a utilizar en vind o observadores
    data: () => ({
        loading: false,
        email: "",
        password: "",
        pathURL: process.env.AUTH_SERVICE,
        errorMessage: "",
        loaddingErrorMessage: false,
        snackbar: true
    }),

    //observadores
    watch: {
        async loading(val: any) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": this.email,
                "password": this.password
            });

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };



            let response = await fetch(`${this.pathURL}/Sign/login`, requestOptions)
                .then(res => res.text())
                .then(result => {
                    let ResultToJson: any = {
                        type: "error",
                        token: ""
                    };
                    try {
                        ResultToJson = JSON.parse(result)
                    } catch (e) {
                        ResultToJson = {
                            type: "error",
                            token: ""
                        };
                    }
                    return {
                        loadding: false,
                        data: result,
                        status: ResultToJson.type !== 'error' ? 200 : 502,
                        token: ResultToJson.token
                    }
                })
                .catch(e => {
                    return {
                        loadding: false,
                        data: [],
                        status: 500,
                        token: ""
                    }
                })

            switch (response.status) {
                case 404:
                    this.loaddingErrorMessage = true
                    this.errorMessage = "Error 404"
                    break;
                case 500:
                    this.loaddingErrorMessage = true
                    this.errorMessage = "Error en servicio"
                    break;
                case 200:
                    this.$emit('finished')
                    sessionStorage.setItem('cookie', response.token)
                    break;
                case 502:
                    this.loaddingErrorMessage = true
                    this.errorMessage = "Usuario no encontrado"
                    break;
                default:
                    break;
            }
            this.loading = response.loadding

        }
    },

    created() {
        console.log(this.isFinished)
    },

    methods:{
        goToSignUp(){
        
            router.push('/signUp')
        }
    }
}
</script>

<style>
.link {
    text-decoration: none;
    color: #000;
}

.rows {
    width: 100%;
}
</style>