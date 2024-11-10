<script setup>
import { onMounted, ref } from 'vue';

const emits = defineEmits(['input']);

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  required: {
    type: Boolean,
    required: false
  },
  initialValue: {
    type: String,
    required: true
  }
});

function generateRandomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

let randomId;

let inputRef = ref(null);

onMounted(() => {
  inputRef.value.value = props.initialValue || '';
})

onMounted(() => {
  randomId = generateRandomString();
})
</script>

<template>
  <div class="flex flex-col">
    <label :for="randomId" v-if="label" class="text-[18px] leading-normal font-medium mb-2">
      {{ label }}{{ required ? ' *' : '' }}
    </label>
    <input :id="randomId" type="text"
      class="border-2 border-textHighlight py-[2px] px-[8px] focus:outline-none focus:ring-0"
      @input="emits('input', $event.target.value)" ref="inputRef">
  </div>
</template>
