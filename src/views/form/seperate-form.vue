<template>
  <div class="flex justify-center mt-10">
    <Form class="w-[220px] flex flex-col space-y-3">
      <form-item name="name" label="姓名">
        <Input></Input>
      </form-item>
      <form-item name="sex" label="性别">
        <Select v-model="sex" :options="sexOptions"></Select>
      </form-item>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Form, FormItem, Input, Select } from '@/package';

const sex = ref('');
const sexOptions = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
];
</script>
<style lang=""></style>
