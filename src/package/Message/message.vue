<template>
  <TransitionRoot as="template" :show="model">
    <Dialog class="relative z-[100]" @close="model = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto"
        @click="model = false"
      >
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-start sm:p-0 sm:pt-16"
        >
          <TransitionChild
            as="div"
            class="w-full max-w-lg"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div
                :class="[
                  {
                    'sm:flex sm:items-start': ['info', 'error'].includes(type as string)
                  }
                ]"
              >
                <div
                  v-if="type === 'error'"
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <ExclamationTriangleIcon
                    class="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div
                  v-if="type === 'success'"
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                >
                  <CheckIcon
                    class="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <!-- <div
                  v-if="type === 'info'"
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                > -->
                <InformationCircleIcon
                  class="h-6 w-6 text-blue-600"
                  stroke="rgb(var(--blue-600))"
                  aria-hidden="true"
                  v-if="type === 'info'"
                />
                <!-- </div> -->
                <div
                  :class="[
                    'mt-3 text-center',
                    {
                      'sm:mt-5': type === 'success',
                      'sm:ml-4 sm:mt-0 sm:text-left': ['info', 'error'].includes(type as string)
                    }
                  ]"
                >
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                    >{{ title }}</DialogTitle
                  >
                  <div class="mt-2">
                    <slot></slot>
                    <p v-if="!slots.default" class="text-sm text-gray-500">
                      {{ content }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                v-if="type === 'success'"
                class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  @click="handleOkClick"
                >
                  {{ okText }}
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  @click="handleCancelClick"
                  ref="cancelButtonRef"
                >
                  {{ cancelText }}
                </button>
              </div>
              <div
                v-if="type === 'error'"
                class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  @click="handleOkClick"
                >
                  {{ okText }}
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="handleCancelClick"
                  ref="cancelButtonRef"
                >
                  {{ cancelText }}
                </button>
              </div>
              <div
                v-if="type === 'info'"
                class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  @click="handleOkClick"
                >
                  {{ okText }}
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="handleCancelClick"
                  ref="cancelButtonRef"
                >
                  {{ cancelText }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted, useSlots } from 'vue';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import {
  ExclamationTriangleIcon,
  CheckIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';
import { MessageProps } from './interface.ts';

const props = withDefaults(defineProps<MessageProps>(), {
  title: '提示',
  okText: '确定',
  cancelText: '取消',
});

const { title, content, okText, cancelText } = toRefs(props);
const slots = useSlots();

const model = ref(false);

const handleOkClick = () => {
  model.value = false;
};

const handleCancelClick = () => {
  model.value = false;
};

onMounted(() => {
  model.value = true;
});
</script>
