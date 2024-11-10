<script setup>

// import { ref } from 'vue';

import CFButton from './CFButton.vue';
import SingleFormView from './SingleFormView.vue';

defineProps({
  currentForms: {
    type: Array,
    required: false
  }
})

// const formData = ref({
//   firstName: '',
//   lastName: '',
//   dateOfBirth: null,
//   country: null,
//   profession: null,
//   yearsInProfession: null
// });

function createNewForm() {

}

</script>

<template>
  <div v-if="currentForms && currentForms.length > 0" class="flex-col">

    <div class="flex justify-between">
      <h2 class="text-[24px] leading-normal font-medium">Found {{ currentForms.length }} forms</h2>

      <CFButton @handle-click="createNewForm">
        <svg width="16px" height="16px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path fill="#ffffff" fill-rule="evenodd"
            d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z" />
        </svg> Add a form
      </CFButton>
    </div>

    <div class="mt-4 grid grid-cols-[repeat(3,_1fr)] gap-x-[48px] gap-y-[48px]">
      <SingleFormView v-for="form in currentForms" :key="form['customer_id']"   :form="form" />
    </div>
  </div>
  <div v-else class="flex justify-between">
    <h2 class="text-[24px] leading-normal font-medium">There are no forms currently</h2>

    <CFButton @handle-click="createNewForm">
      <svg width="16px" height="16px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path fill="#ffffff" fill-rule="evenodd"
          d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z" />
      </svg> Add a form
    </CFButton>
  </div>
</template>
