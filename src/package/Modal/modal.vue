<template>
  <TransitionRoot as="template" :show="model">
    <Dialog class="relative z-10" :style="dialogStyle" @close="model = false">
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
        :style="dialogStyle"
      >
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-start sm:p-0 sm:pt-16"
        >
          <TransitionChild
            as="div"
            class="w-full max-w-full flex justify-center"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              v-bind="$attrs"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 outline-none"
                  @click="model = false"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <!-- <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div> -->
                <div
                  class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full"
                >
                  <slot name="title" v-if="$slots.title"></slot>
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                    v-if="!$slots.title"
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
                v-if="!hideFooter"
                class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer"
                  @click="handleOkClick"
                >
                  {{ okText }}
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
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
import { computed, toRefs, useSlots } from 'vue';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ModalProps } from './interface';
import { isNumber } from '@/utils/is';

const props = withDefaults(defineProps<ModalProps>(), {
  title: '提示',
  okText: '确定',
  cancelText: '取消',
});

const { title, content, okText, cancelText, hideFooter } = toRefs(props);
const slots = useSlots();
const emit = defineEmits<{
  'update:visible': [visible: boolean];
  onOk: [];
  onCancel: [];
}>();

const model = defineModel<boolean>('visible');

const dialogStyle = computed(() => {
  const obj: Record<string, any> = {};
  if (props.zIndex) {
    obj['z-index'] = props.zIndex;
  }
  if (props.width) {
    if (isNumber(props.width)) {
      obj.width = props.width + 'px';
    } else {
      obj.width = props.width;
    }
  }
  return obj;
});

const handleOkClick = () => {
  emit('onOk');
};

const handleCancelClick = () => {
  emit('onCancel');
  model.value = false;
};
</script>
