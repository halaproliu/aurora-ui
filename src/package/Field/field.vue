<template>
  <div
    :class="[
      'flex w-full',
      direction === 'horizontal'
        ? 'items-center gap-x-4'
        : 'flex-col gap-y-2 justify-start items-start',
    ]"
    v-bind="$attrs"
  >
    <label
      v-if="label"
      :style="labelWidthStyle"
      :for="name"
      class="text-sm font-medium leading-6 text-gray-900 flex items-center justify-end gap-x-0.5 text-right"
    >
      <span>{{ label }}</span>
      <i class="text-red-600" v-if="required">*</i>
    </label>
    <div class="relative w-full">
      <slot :id="name"></slot>
      <p class="mt-1 text-sm text-red-600" v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { FieldProps } from './interface';
import { isNumber } from '@/utils/is';

const props = withDefaults(defineProps<FieldProps>(), {
  direction: 'vertical',
});
const { label, name, direction, required, errorMessage, width } = toRefs(props);

const emit = defineEmits(['change', 'input']);

const labelWidthStyle = computed(() => {
  if (isNumber(width.value)) {
    return {
      minWidth: `${width.value}px`,
    };
  } else {
    return {
      minWidth: width.value,
    };
  }
});
</script>
