<script setup>

import TheHeader from './components/TheHeader.vue';
import CustomersFormView from './components/CustomersFormView.vue';
import TheLoadingView from './components/TheLoadingView.vue';
import FormEditor from './components/FormEditor.vue';

import { onMounted, ref } from 'vue';
import eventBus from './utils/eventBus.js';

const error = ref(null);
const existingForms = ref([]);

const currentForm = ref(null);
const currentAction = ref(-1); // -1 'creation' or id for 'editing'

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

  eventBus.on('close-form-editor', () => {
    currentForm.value = null;
    currentAction.value = -1;
  })

  eventBus.on('handle-form-editing', (passedForm) => {
    currentForm.value = passedForm;
    currentAction.value = passedForm.customer_id;
  })

  eventBus.on('handle-form-creation', () => {
    currentForm.value = {};
    currentAction.value = -1;
  })

  eventBus.on('handle-form-submission', async (formData) => {
    try {
      let request;

      if (currentAction.value == -1) {
        request = await fetch('http://localhost:3000/new-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(formData)
        })
      } else {
        request = await fetch('http://localhost:3000/update-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({ customer_id: currentAction.value, ...formData })
        })
      }

      const parsedRequest = await request.json();

      if (request.status < 200 || request.status >= 300) {
        error.value = parsedRequest;
        throw new Error('/get-forms request returned error code', parsedRequest);
      }

      existingForms.value = parsedRequest.rows;

      eventBus.emit('close-form-editor');

    } catch (err) {
      error.value = err;
    }

  })
})
</script>

<template>
  <TheHeader />

  <main class="relative w-full max-w-[1800px] min-h-[420px] m-auto mt-4 px-4 py-4 rounded-[4px] bg-compBackground">
    <CustomersFormView v-if="existingForms.length > 0 || error != null" :currentForms="existingForms" />
    <TheLoadingView v-else />

    <div
      class="opacity-0 w-full h-full fixed top-0 left-0 bg-popUpBackground pointer-events-none flex justify-center items-center px-[40px] py-[24px]"
      :class="{ 'opacity-[1] pointer-events-auto': currentForm != null }">
      <FormEditor v-if="currentForm != null" :currentForm="currentForm" />
    </div>

  </main>

</template>
