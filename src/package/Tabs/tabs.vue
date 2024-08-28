<template>
  <div v-bind="$attrs">
    <div class="border-gray-200 relative">
      <div
        ref="container"
        :class="['-mb-px flex space-x-8', tabClass]"
        aria-label="Tabs"
      >
        <div
          v-for="(t, index) in tabs"
          :key="index"
          :aria-current="t.key === modelValue ? 'page' : undefined"
          :class="[
            'cursor-pointer',
            t.key === modelValue
              ? ' text-blue-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium',
          ]"
          @click="selectTab(index, t)"
          :ref="
            (el) => {
              if (t.key === modelValue) {
                selectedItem = el as HTMLDivElement
              }
            }
          "
        >
          {{ t.label }}
        </div>
        <div class="ml-auto absolute right-0 top-1/2 -translate-y-1/2 pb-1">
          <slot name="extra"></slot>
        </div>
      </div>
      <div
        ref="indicator"
        class="h-0.5 bg-blue-600 absolute bottom-0 transition-all duration-300"
      />
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watchEffect } from 'vue';
import { TabProps } from './interface.ts';

export default defineComponent({
  name: 'Tabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: undefined,
    },
    tabClass: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    const selectedItem = ref<HTMLDivElement>();
    const indicator = ref<HTMLDivElement>(); //移动条
    const container = ref<HTMLDivElement>(); //整个导航

    onMounted(() => {
      watchEffect(() => {
        if (container.value && selectedItem.value && indicator.value) {
          const { width } = selectedItem.value?.getBoundingClientRect();
          indicator.value.style.width = width + 'px';
          const { left: left1 } = container.value.getBoundingClientRect();
          const { left: left2 } = selectedItem.value.getBoundingClientRect();
          const left = left2 - left1;
          indicator.value.style.left = left + 'px';
        }
      });
    });
    const defaults = slots.default?.(); //获取插槽内容
    // defaults?.forEach((tag) => {
    //   console.log('tag: ', tag)
    //   if (tag.type !== TabPane) {
    //     throw new Error('Tabs 子标签必须是 TabPane')
    //   }
    // })
    const current = computed(() => {
      return defaults?.find((tag) => tag?.props?.title === props?.modelValue);
    });
    const tabs = defaults?.map((tag) => {
      return {
        label: tag.props?.label,
        key: tag.props?.value,
      };
    });
    const selectTab = (index: number, tab: TabProps) => {
      emit('update:modelValue', tab.key, index);
      emit('change', tab.key, index);
    };

    return {
      current,
      defaults,
      tabs,
      selectTab,
      selectedItem,
      indicator,
      container,
    };
  },
});
</script>

<style scoped></style>
