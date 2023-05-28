<template>
  <VContainer>
    <VRow>
      <VCol offset="4" cols="4">
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
