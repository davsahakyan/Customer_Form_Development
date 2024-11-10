<script setup>

import CFTextInput from './CFTextInput.vue';
import CFDateInput from './CFDateInput.vue';
import CFCountriesDropdown from './CFCountriesDropdown.vue';
import CFButton from './CFButton.vue';

import { ref, computed, toRaw } from 'vue';

import eventBus from '../utils/eventBus.js';

const props = defineProps({
  currentForm: {
    type: Object,
    required: false
  }
});

function formatDate(dateString) {
  try {
    let date = new Date(dateString);

    if (date == 'Invalid Date') return '';

    return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
  } catch (err) {
    console.log(err);
    return dateString;
  }
}

const formStep = ref(1);

const formModel = ref({
  first_name: '',
  last_name: '',
  date_of_birth: '',
  country: '',
  profession: '',
  years_in_profession: '',
});

if (!!props.currentForm && Object.keys(props.currentForm).length > 0) {
  const { first_name,
    last_name,
    date_of_birth,
    country,
    profession,
    years_in_profession } = props.currentForm;

  formModel.value.first_name = first_name;
  formModel.value.last_name = last_name;
  formModel.value.date_of_birth = formatDate(date_of_birth);
  formModel.value.country = country;
  formModel.value.profession = profession;
  formModel.value.years_in_profession = years_in_profession;
}

function goBack() {
  if (formStep.value > 1) {
    formStep.value = formStep.value - 1;
  }
}

const error = ref(null);
let errorTimeout;

const isCurrentStepValid = computed(() => {
  if (formStep.value === 1) {
    console.log(formModel.value)
    return formModel.value.first_name.trim() !== '' && formModel.value.last_name.trim() !== '';
  }

  if (formStep.value === 2) {
    return formModel.value.date_of_birth.trim() !== '' && formModel.value.date_of_birth.length == 10;
  }

  if (formStep.value === 3) {
    return formModel.value.country.trim() !== '';
  }

  return true;
});

function goForward() {

  if (isCurrentStepValid.value) {
    if (formStep.value == 1) {
      formStep.value = 2;
      return
    }
    if (formStep.value == 2) {
      formStep.value = 3;
      return;
    }

    if (formStep.value == 2) {
      formStep.value = 3;
      return;
    }

    if (formStep.value == 3) {
      formStep.value = 4;
      return;
    }
  } else {

    clearTimeout(errorTimeout);

    error.value = 'Please properly fill all the fields to advance';
    errorTimeout = setTimeout(() => {
      error.value = null;
    }, 5000)
  }
}

function completeForm() {
  eventBus.emit('handle-form-submission', toRaw(formModel.value));
}
</script>

<template>
  <div id="form-view"
    class="relative rounded-md w-full h-full max-w-[1440px] max-h-[600px] bg-pageBackground flex flex-col justify-between">
    <h3 class="mt-4 block text-center font-medium text-xl transition-opacity" :class="{ unvisible: formStep > 3 }">Step
      <span class="text-center font-medium px-2 py-2 bg-textHighlight text-white rounded-[40px]">{{ formStep }} /
        3</span>
    </h3>

    <div v-if="formStep == 1" class="">
      <div class="flex gap-x-4 mx-auto w-max mt-[40px]">
        <CFTextInput label="First Name" :initialValue='currentForm.first_name || ""'
          @input="formModel.first_name = $event" :required="true" />
        <CFTextInput label="Last Name" :initialValue='currentForm.last_name || ""' @input="formModel.last_name = $event"
          :required="true" />
      </div>
    </div>

    <div v-if="formStep == 2">
      <div class="flex gap-x-4 mx-auto w-max mt-[40px]">
        <CFDateInput label="Date of Birth" :initialValue='formatDate(currentForm.date_of_birth)'
          @input="formModel.date_of_birth = $event" :required="true" />
      </div>
    </div>

    <div v-if="formStep == 3" class="max-w-[600px] mx-auto flex flex-col gap-y-2">
      <CFCountriesDropdown label="Country" :required="true" :initial-value="currentForm.country"
        @input="formModel.country = $event" />
      <div class="flex gap-x-[16px] justify-center">
        <CFTextInput label="Occupation/Employment" :initial-value="currentForm.profession || ''"
          @input="formModel.profession = $event"></CFTextInput>
        <CFTextInput :class="{ visible: !!formModel.profession && formModel.profession.length > 0 }"
          class="opacity-0 pointer-events-none transition-opacity w-[50%]" label="Years in current occupation"
          :initial-value="currentForm.years_in_profession || ''" @input="formModel.years_in_profession = $event">
        </CFTextInput>
      </div>
    </div>

    <div v-if="formStep == 4" class="max-w-[460px] mx-auto text-[20px] text-center">
      Pretty much finished! You can complete your model by clicking 'Complete'.
    </div>


    <p v-if="formStep >= 1 && formStep <= 3" class="text-center text-[22px] font-medium">Enter all the required
      information to create a new model<br><br>
      Note:
      <span v-html="error ? error : 'any fields marked with * are required'"
        class="text-[1em] font-normal transition-all" :class="{ 'text-red-600': error }"></span>
    </p>

    <div class="buttons flex gap-x-2 justify-center mb-4">
      <CFButton @handle-click="goBack">
        Previous
      </CFButton>
      <CFButton @handle-click="goForward" v-if="formStep >= 1 && formStep <= 3">
        Next
      </CFButton>
      <CFButton @handle-click="completeForm" v-if="formStep == 4">
        Complete
      </CFButton>
    </div>

    <div class="close absolute top-1 right-2 p-1 rounded-full bg-textHighlight" @click="eventBus.emit('close-form-editor')">
      <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
          fill="#ffffff" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.visible {
  opacity: 1;
  pointer-events: auto;
}

.unvisible {
  opacity: 0;
  pointer-events: none;
}
</style>
