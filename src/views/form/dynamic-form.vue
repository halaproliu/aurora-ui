<template>
  <!-- <Form>
        <form-item name="id">
          <Input></Input>
        </form-item>
      </Form> -->
  <div class="flex justify-center h-screen mt-6">
    <DynamicForm :schema="formSchema" />
  </div>
</template>

<script lang="ts" setup>
import { DynamicForm, Form, FormItem, Input, Select } from "@/package";
import * as Yup from "yup";

const formSchema = {
  fields: [
    {
      label: "姓名",
      name: "name",
      as: Input,
      rules: Yup.string().required(),
    },
    {
      label: "性别",
      name: "gender",
      as: Select,
      rules: Yup.string().required(),
      options: [
        {
          label: "男",
          value: "male",
        },
        {
          label: "女",
          value: "female",
        },
      ],
      class: "w-full",
    },
  ],
};
</script>
