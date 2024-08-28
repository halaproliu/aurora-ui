<template>
  <div
    :class="[
      'flex',
      direction === 'horizontal'
        ? 'items-baseline gap-x-4'
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
      <div class="rounded-md shadow-sm">
        <div
          v-if="$slots.prefix"
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <slot name="prefix"></slot>
        </div>
        <input
          v-model="model"
          @change="handleChange"
          @input="handleInput"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
          :type="type"
          :name="name"
          :id="name"
          :disabled="disabled"
          :class="[
            'bg-white block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus-visible:outline-none sm:text-sm sm:leading-6',
            $slots.prefix ? 'pl-10' : 'pl-3',
            disabled ? 'cursor-not-allowed bg-gray-100/70 text-slate-300' : '',
          ]"
          :placeholder="placeholder"
          v-if="type !== 'textarea'"
        />
        <textarea
          v-if="type === 'textarea'"
          v-model="model"
          @change="handleChange"
          @input="handleInput"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
          :rows="rows"
          :disabled="disabled"
          name="comment"
          id="comment"
          :class="[
            'bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus-visible:outline-none sm:text-sm sm:leading-6',
            $slots.prefix ? 'pl-10' : 'pl-3',
            disabled ? 'cursor-not-allowed bg-gray-100 text-slate-300' : '',
          ]"
        />
      </div>
      <p class="mt-1 text-sm text-red-600" v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, onUnmounted } from 'vue';
import { InputProps } from './interface';
import { isNumber } from '@/utils/is';

const props = withDefaults(defineProps<InputProps>(), {
  placeholder: '请输入',
  direction: 'horizontal',
});
const {
  placeholder,
  label,
  name,
  type,
  direction,
  required,
  errorMessage,
  labelWidth,
  rows,
  disabled,
} = toRefs(props);

const model = defineModel<string | number>();
const emit = defineEmits([
  'change',
  'input',
  'compositionstart',
  'compositionend',
]);
const flag = ref(false);
const timeoutId = ref<number | null>(null);
const changeTimeoutId = ref<number | null>(null);

const labelWidthStyle = computed(() => {
  if (isNumber(labelWidth.value)) {
    return {
      minWidth: `${labelWidth.value}px`,
    };
  } else {
    return {
      minWidth: labelWidth.value,
    };
  }
});

const handleCompositionStart = (e: Event) => {
  flag.value = true;
  emit('compositionstart', (e.target as HTMLInputElement).value);
};

const handleCompositionEnd = (e: Event) => {
  flag.value = false;
  emit('compositionend', (e.target as HTMLInputElement).value);
};

const handleChange = (e: Event) => {
  changeTimeoutId.value = window.setTimeout(() => {
    if (flag.value) return;
    emit('change', (e.target as HTMLInputElement).value);
  }, 0);
};

const handleInput = (e: Event) => {
  timeoutId.value = window.setTimeout(() => {
    if (flag.value) return;
    emit('input', (e.target as HTMLInputElement).value);
  }, 0);
};

onUnmounted(() => {
  if (timeoutId.value) clearTimeout(timeoutId.value);
  if (changeTimeoutId.value) clearTimeout(changeTimeoutId.value);
});
</script>
