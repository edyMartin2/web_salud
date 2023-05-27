<template>
    <VContainer>
        <VCol>
            <VRow>
                <VCol cols="12" style="text-align: center;">
                    <h1>Crear cuenta</h1>
                </VCol>
                <VCol cols="12">
                    <VTextField :value="fullName" v-model="fullName" variant="outlined" label="Nombre completo">
                    </VTextField>
                </VCol>
                <VCol cols="12">
                    <VTextField :value="email" v-model="email" variant="outlined" label="Correo"></VTextField>
                </VCol>
                <VCol cols="12">
                    <VTextField :value="password" v-model="password" type="password" variant="outlined" label="Contraseña">
                    </VTextField>
                </VCol>
                <VCol cols="12">
                    <VTextField :value="repeatPassword" v-model="repeatPassword" type="password" variant="outlined"
                        label="Repite la contraseña">
                    </VTextField>
                </VCol>
                <VCol cols="12">
                    <v-btn block :disabled="uploading" :loading="uploading" class="text-none mb-4"
                        @click="uploading = !uploading" color="reed" size="x-large" variant="flat">
                        Crear cuenta
                    </v-btn>
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

export default {
    data: () => ({
        fullName: '',
        email: '',
        password: '',
        repeatPassword: '',
        pathURL: process.env.AUTH_SERVICE,
        errorMessage: "",
        loaddingErrorMessage: false,
        uploading: false
    }),

    watch: {
        async uploading(val: any) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "Email": this.email,
                "Password": this.password
            });

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            let result = await fetch(`${this.pathURL}/Sign/signup`, requestOptions)
                .then(response => response.text())
                .then(res => {
                    let data = {
                        status: "",
                        messages: "",
                        user_id: ""
                    }
                    try {
                        data = JSON.parse(res)
                    } catch (e) {

                    }
                    return {
                        loadding: false,
                        data: data,
                        code: data.status !== "error" ? 201 : 401
                    }
                })
                .catch(error => {
                    return {
                        loadding: false,
                        data: [],
                        code: 500
                    }
                });
            switch (result.code) {
                case 401:
                    this.errorMessage = result.data.messages
                    this.loaddingErrorMessage = true
                    break
                case 201:
                    alert("SuccesFull")
                    break
                default:
                    break
            }
            this.uploading = result.loadding
        }
    }
}
</script>