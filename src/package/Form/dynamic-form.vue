<template>
  <Form class="flex flex-col gap-4">
    <div
      v-for="{ as, name, label, children, ...attrs } in schema.fields"
      :key="name"
      :class="[
        'flex w-full',
        direction === 'horizontal'
          ? 'items-center gap-x-4'
          : 'flex-col gap-y-2 justify-start items-start',
      ]"
    >
      <label
        class="text-sm font-medium leading-6 text-gray-900 flex items-center justify-end gap-x-0.5 text-right"
        :for="name"
        :style="labelWidthStyle"
        >{{ label }}</label
      >
      <Field :as="as" :id="name" :name="name" v-bind="attrs">
        <template v-if="children && children.length">
          <component
            v-for="({ tag, text, ...childAttrs }, idx) in children"
            :key="idx"
            :is="tag"
            v-bind="childAttrs"
          >
            {{ text }}
          </component>
        </template>
      </Field>
      <ErrorMessage :name="name" />
    </div>
    <!-- <button>Submit</button> -->
  </Form>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { DynamicFormProps } from './interface';
import { isNumber } from '@/utils/is';

const props = withDefaults(defineProps<DynamicFormProps>(), {
  direction: 'horizontal',
});

const { labelWidth } = toRefs(props);

const labelWidthStyle = computed(() => {
  if (isNumber(labelWidth.value)) {
    return {
      minWidth: `${labelWidth.value}px`,
    };
  } else {
    return {
      minWidth: labelWidth.value || '60px',
    };
  }
});
</script>
