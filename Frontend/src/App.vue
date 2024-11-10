<script setup>

import TheHeader from './components/TheHeader.vue';
import CustomersFormView from './components/CustomersFormView.vue';
import TheLoadingView from './components/TheLoadingView.vue';

import { onMounted, ref } from 'vue';
import eventBus from './utils/eventBus.js';

const error = ref(null);
const existingForms = ref([]);

const currentForm = ref(null);

onMounted(async () => {
  try {
    const request = await fetch('http://localhost:3000/get-forms');
    const parsedRequest = await request.json();

    if (request.status < 200 || request.status >= 300) {
      error.value = parsedRequest;
      throw new Error('/get-forms request returned error code', parsedRequest);
    }

    existingForms.value = parsedRequest.rows;

  } catch (err) {
    error.value = err;
  }

  // Set up listener for the form edition request
  eventBus.on('handle-form-editing', (passedForm) => {
    console.log(passedForm);
  })
})
</script>

<template>
  <TheHeader />

  <main class="relative w-full max-w-[1800px] min-h-[420px] m-auto mt-4 px-4 py-4 rounded-[4px] bg-compBackground">
    <CustomersFormView v-if="existingForms.length > 0 || error != null" :currentForms="existingForms" />
    <TheLoadingView v-else />

    <!-- <FormEditor v-if="currentForm != null" :currentForm="currentForm" /> -->

  </main>

</template>

<style scoped></style>
