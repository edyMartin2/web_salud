<template>
    <VContainer>
        <VCol>
            <VRow>
                <VCol cols="12" style="text-align: center;">
                    <h1>Inicie sesión</h1>
                </VCol>
                <VCol cols="12">
                    <VTextField :value="email" variant="outlined" label="Correo" v-model="email">
                    </VTextField>
                </VCol>
                <VCol cols="12">
                    <VTextField :value="password" variant="outlined" type="password" label="Contraseña" v-model="password">
                    </VTextField>
                </VCol>
                <VCol cols="12" style="text-align: center;">
                    <v-btn :disabled="loading" :loading="loading" block class="text-none mb-4" color="indigo-darken-3"
                        size="x-large" variant="flat" @click="loading = !loading">
                        Iniciar secion
                    </v-btn>
                    <RouterLink class="link" to="/signUp">No tengo una cuenta</RouterLink>
                </VCol>
                <VCol cols="12">
                    <v-snackbar v-model="loaddingErrorMessage">
                        {{ errorMessage }}

                        <template v-slot:actions>
                            <v-btn color="pink" variant="text" @click="loaddingErrorMessage = false">
                                Close
                            </v-btn>
                        </template>
                    </v-snackbar>
                </VCol>
            </VRow>
        </VCol>
    </VContainer>
</template>

<script lang="ts">

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
    }
}
</script>

<style>

.link{
    text-decoration: none;
    color: #000;
}

</style>