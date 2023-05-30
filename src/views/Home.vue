<template>
  <VContainer>
    <VRow>
      <VCol offset-sm="0" offset-lg="4" cols="12" sm="12" lg="4">
        <LogInComponent @finished="Next" v-show="isLogged"></LogInComponent>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import LogInComponent from '@/components/LogInComponent.vue'
import SignUpComponent from '@/components/SignUpComponent.vue'

import { onBeforeMount } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let isLogged = false
const Next = () => {
  router.push('/all')
};

onBeforeMount(() => {
  let token = sessionStorage.getItem('cookie')
  if (token) {
    router.push('/all')
  } else {
    isLogged = true
  }
})
</script>
