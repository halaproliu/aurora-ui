<script setup lang="ts">
import { Form, FormItem, Input } from "./package";
</script>

<template>
  <div class="w-96 mx-auto mt-6">
    <Form>
      <form-item name="id"><Input v-model="value" /></form-item>
    </Form>
  </div>
</template>

<style scoped></style>
