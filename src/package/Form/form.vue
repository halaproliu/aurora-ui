<template>
  <form v-bind="$attrs" @submit="onSubmit">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
// import useForm from './useForm';
import { provide } from 'vue';
import { FormProps } from './interface';
import { useForm, FormContext, FormContextKey } from 'vee-validate';

const props = defineProps<FormProps<T>>();

const { defineField, handleSubmit, ...rest } = useForm<T>();
provide<FormContext>(FormContextKey, {
  defineField,
  handleSubmit,
  ...rest,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<style lang="scss" scoped></style>
