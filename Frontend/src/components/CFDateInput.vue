<script setup>
import { ref, onMounted } from 'vue';

const emits = defineEmits(['input']);

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
  },
  initialValue: {
    type: String,
    required: false,
  },
});

const day = ref('');
const month = ref('');
const year = ref('');

function emitDate() {
  if (day.value.length === 2 && month.value.length === 2 && year.value.length === 4) {
    emits('input', `${day.value}-${month.value}-${year.value}`);
  }
}

onMounted(() => {
  if (props.initialValue) {
    const [d, m, y] = props.initialValue.split('-');
    if (!d || !m || !y) return;
    day.value = d ? (d.length == 1 ? `0${d}` : d) : '';
    month.value = m ? m : '';
    year.value = y ? y : '';

    emitDate();
  }
});
</script>

<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-[18px] leading-normal font-medium mb-2">
      {{ label }}{{ required ? ' *' : '' }}
    </label>
    <div class="flex gap-2">
      <input v-model="day" type="text" placeholder="DD" maxlength="2"
        class="w-[80px] border-2 border-textHighlight text-center py-[2px] px-[4px] focus:outline-none focus:ring-0"
        @input="emitDate" />
      <input v-model="month" type="text" placeholder="MM" maxlength="2"
        class="w-[80px] border-2 border-textHighlight text-center py-[2px] px-[4px] focus:outline-none focus:ring-0"
        @input="emitDate" />
      <input v-model="year" type="text" placeholder="YYYY" maxlength="4"
        class="w-[90px] border-2 border-textHighlight text-center py-[2px] px-[4px] focus:outline-none focus:ring-0"
        @input="emitDate" />
    </div>
  </div>
</template>
