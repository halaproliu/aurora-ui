<template>
  <Combobox
    as="div"
    v-model="model"
    @update:modelValue="query = ''"
    :by="compareFn"
  >
    <div class="relative">
      <ComboboxInput
        :class="[
          'w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          { 'cursor-not-allowed bg-gray-100': props.disabled },
        ]"
        @change="handleChange"
        @blur="query = ''"
        :display-value="displayValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        autocomplete="off"
      />
      <ComboboxButton
        :class="[
          'absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none',
          { 'cursor-not-allowed': props.disabled },
        ]"
        :disabled="props.disabled"
        v-slot="{ open }"
      >
        <ChevronDownIcon
          :class="['h-5 w-5 text-gray-400', { 'rotate-180 transform': open }]"
          aria-hidden="true"
        />
      </ComboboxButton>

      <ComboboxOptions
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        v-if="props.options.length > 0"
      >
        <ComboboxOption
          v-for="option in props.options"
          :key="option[props.oKey as keyof T]"
          :value="option[props.valueKey as keyof T]"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
            ]"
          >
            <div class="flex items-center">
              <!-- <img :src="person.imageUrl" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" /> -->
              <span :class="['ml-3 truncate', selected && 'font-semibold']">
                {{ option[props.labelKey as keyof T] }}
              </span>
            </div>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-indigo-600',
              ]"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script lang="ts" setup generic="T extends object">
import { ref, withDefaults } from 'vue';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue';
import { AutoCompleteProps } from './interface';
import { isObject } from '@/utils/is';

const props = withDefaults(defineProps<AutoCompleteProps<T>>(), {
  oKey: 'id',
  labelKey: 'label' as keyof T,
  valueKey: 'value' as keyof T,
});
const emit = defineEmits(['change']);
const model = defineModel();
const query = ref('');

const compareFn = (a: T, b: T) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const displayValue = (option: T | keyof T) => {
  if (isObject(option)) {
    return option[props.labelKey as keyof T];
  }
  const selected = props.options.find(
    (item) => item[props.valueKey as keyof T] === option
  );
  return selected?.[props.labelKey as keyof T];
};

const handleChange = (e: Event) => {
  model.value = null;
  query.value = (e.target as HTMLInputElement).value;
  emit('change', (e.target as HTMLInputElement).value);
};
</script>
