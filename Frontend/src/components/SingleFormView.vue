<script setup>
import CFButton from './CFButton.vue';
import eventBus from '../utils/eventBus.js';
import { toRaw } from 'vue';

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
});

function formatDate(dateString) {
  try {
    let date = new Date(dateString);

    return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
  } catch (err) {
    console.log(err);
    return dateString;
  }
}

const {
  customer_id,
  first_name,
  last_name,
  date_of_birth,
  country,
  profession,
  years_in_profession
} = props.form;

function handleEditAction() {
  eventBus.emit('handle-form-editing', toRaw(props.form));
}

</script>

<template>
  <div class="bg-tableBackground px-4 py-4 rounded-md">
    <div class="flex justify-between items-center rounded-[6px]">
      <span class="text-[20px] font-medium">Form No. {{ customer_id }}</span>
      <CFButton @handle-click="handleEditAction">
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z"
            stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M15.3097 5.30981L18.7274 8.72755" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        Edit
      </CFButton>
    </div>
    <table class="border-spacing-y-[10px] border-separate">
      <tbody>
        <tr>
          <td class="py-[4px] rounded-[3px] bg-[#E0E0E0] text-center">First Name</td>
          <td class="font-medium pl-2">{{ first_name }}</td>
        </tr>
        <tr>
          <td class="py-[4px] rounded-[3px] bg-[#E0E0E0] text-center">Last Name</td>
          <td class="font-medium pl-2">{{ last_name }}</td>
        </tr>
        <tr>
          <td class="py-[4px] rounded-[3px] bg-[#E0E0E0] text-center">Date of Birth</td>
          <td class="font-medium pl-2">{{ formatDate(date_of_birth) }}</td>
        </tr>
        <tr>
          <td class="py-[4px] rounded-[3px] bg-[#E0E0E0] text-center">Country</td>
          <td class="font-medium pl-2">{{ country }}</td>
        </tr>
        <tr>
          <td class="py-[4px] rounded-[3px] bg-[#E0E0E0] text-center">Profession</td>
          <td class="font-medium pl-2" :class="{ 'italic': !profession }">{{ profession ? profession
            : 'Not set' }}</td>
        </tr>
        <tr>
          <td class="py-[4px] px-2 rounded-[3px] bg-[#E0E0E0] text-center">Years in Profession</td>
          <td class="font-medium pl-2" :class="{ 'italic': !years_in_profession }">{{ years_in_profession ?
            years_in_profession
            : 'Not set' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
