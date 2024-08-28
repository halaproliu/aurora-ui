<template>
  <Listbox
    as="div"
    v-model="model"
    @update:model-value="handleChange"
    v-bind="$attrs"
    :multiple="multiple"
    :by="compareFn"
    :disabled="disabled"
    v-slot="{ open }"
  >
    <div class="relative">
      <ListboxButton
        :class="[
          'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6',
          disabled ? 'cursor-not-allowed bg-gray-100/70 text-slate-300' : '',
          inputClass,
        ]"
      >
        <span class="block truncate" v-if="showLabel">{{ showLabel }}</span>
        <span class="block truncate text-slate-500" v-if="!showLabel">{{
          placeholder || '请选择'
        }}</span>
        <span
          @mouseover.stop="handleMouseOver"
          @mouseenter.stop="handleMouseOver"
          @mouseleave.stop="handleMouseLeave"
          class="absolute inset-y-0 right-0 flex items-center pr-2 select-icon"
        >
          <ChevronDownIcon
            :class="['h-5 w-5 text-gray-400', { 'rotate-180': open }]"
            aria-hidden="true"
            v-show="!isIconHover"
          />
          <XMarkIcon
            @click="clearSelect"
            class="w-5 h-5 text-gray-400"
            aria-hidden="true"
            v-show="isIconHover"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        v-if="options.length > 0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          v-if="!isIconHover"
        >
          <ListboxOption
            as="template"
            v-for="option in options"
            :key="option[oKey]"
            :value="valueType === 'basic' ? option[valueKey] : option"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
                >{{ formatter(option) }}</span
              >

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-blue-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { SelectProps, SelectOption } from './interface';
import { isFunction, isObject, isArray } from '@/utils/is.ts';

const props = withDefaults(defineProps<SelectProps>(), {
  labelKey: 'label',
  valueKey: 'value',
  oKey: 'id',
  valueType: 'basic',
  allowClear: true,
});
const emit = defineEmits(['change']);

const model = defineModel<SelectOption | string | number | boolean>();
const isIconHover = ref(false);

const compareFn = (a: SelectOption, b: SelectOption) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const clearSelect = () => {
  model.value = undefined;
};

const formatter = (option: SelectOption) => {
  if (isFunction(props.formatter)) {
    if (isArray(option)) {
      const arr: SelectOption[] = [];
      option.forEach((o) => {
        const obj: SelectOption =
          props.options.find((item) => item[props.valueKey] === o) || {};
        arr.push(obj);
      });
      return props.formatter(arr);
    } else if (isObject(option)) {
      return props.formatter(option);
    } else {
      const current =
        props.options.find((item) => item[props.valueKey] === option) || {};
      return props.formatter(current);
    }
  }
  if (isArray(option)) {
    const options = props.options.filter((item) =>
      option.includes(item[props.valueKey])
    );
    return options.map((item) => item[props.labelKey]).join(',');
  } else if (isObject(option)) {
    return option?.[props.labelKey];
  } else {
    const current = props.options.find(
      (item) => item[props.valueKey as keyof SelectOption] === option
    );
    return current?.[props.labelKey];
  }
};

const showLabel = computed(() => {
  if (!model.value) return '';
  return formatter(model.value as any);
});

const handleMouseOver = () => {
  isIconHover.value = true;
};

const handleMouseLeave = () => {
  isIconHover.value = false;
};

const handleChange = (value: any) => {
  emit('change', value);
};
</script>
