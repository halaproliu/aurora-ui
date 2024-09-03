<template>
  <div class="progress-circle" ref="progressRef" :data-percent="percent" :style="containerStyle">
    <svg>
      <circle stroke="var(--inactive-color)"></circle>
      <circle
        class="progress-value"
        stroke="var(--color)"
        style="
          stroke-dasharray: calc(
              2 * 3.1415 * (var(--size) - var(--border-width)) / 2 * (var(--percent) / 100)
            ),
            1000;
        "
      />
    </svg>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ProgressProps } from './interface.ts'
import { isNumber } from '@/utils/is.ts'

const props = defineProps<ProgressProps>()
const progressRef = ref()
const getPixel = (size: string | number) => {
  if (isNumber(size)) {
    return size + 'px'
  } else {
    return /px$/.test(size) ? size : size + 'px'
  }
}

const containerStyle = computed(() => {
  return {
    '--percent': props.percent,
    '--border-width': props.strokeWidth,
    '--color': props.color,
    '--inactive-color': props.inactiveColor,
    '--size': getPixel(props.size)
  }
})
</script>
<style lang="less" scoped>
.progress-circle {
  --percent: 0; /* 百分数 */
  --size: 20px; /* 尺寸大小 */
  --border-width: 2px; /* 环形宽度（粗细） */
  --color: #7856d7; /* 主色 */
  --inactive-color: #ccc; /* 辅助色 */
  width: var(--size);
  height: var(--size);
  transform: rotate(-90deg);
  border-radius: 50%;
  position: relative;
  circle {
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: calc((var(--size) - var(--border-width)) / 2);
    fill: none;
    stroke-width: var(--border-width);
    stroke-linecap: round;
    transition:
      stroke-dasharray 0.4s linear,
      stroke 0.3s;
  }
  //   &::before {
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%) rotate(90deg);
  //     content: attr(data-percent) '%';
  //     white-space: nowrap;
  //     font-size: 10px;
  //   }

  .progress-circle {
    opacity: var(--percent);
  }
}
</style>
