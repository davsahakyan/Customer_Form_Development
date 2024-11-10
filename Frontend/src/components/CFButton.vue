<script setup>
const emits = defineEmits(['handle-click']);
</script>

<template>
  <button @click="emits('handle-click')"
    class="flex justify-center items-center px-[20px] py-[8px] gap-[8px] bg-buttonBlue text-white text-[18px] rounded-[6px]">
    <slot />
  </button>
</template>

<style scoped></style>
