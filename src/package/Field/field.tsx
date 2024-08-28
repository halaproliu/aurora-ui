import { ref, computed, defineComponent, PropType } from 'vue';
import { FieldProps } from './interface';
import { isNumber } from '@/utils/is';

export default defineComponent({
  name: 'Field',
  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    width: {
      type: [String, Number] as PropType<string | number>,
    },
    direction: {
      type: String as PropType<FieldProps['direction']>,
      default: 'vertical',
    },
    errorMessage: {
      type: String,
    },
    required: {
      type: Boolean,
    },
  },
  emits: ['change', 'input'],
  setup(props, { attrs, slots }) {
    const children = ref();
    const { width, direction } = props;
    const labelWidthStyle = computed(() => {
      if (isNumber(width)) {
        return {
          minWidth: `${width}px`,
        };
      } else {
        return {
          minWidth: width,
        };
      }
    });

    const cls = computed(() => [
      'flex w-full relative',
      direction === 'horizontal'
        ? 'items-center gap-x-4'
        : 'flex-col gap-y-2 justify-start items-start',
    ]);

    const fieldErrorMessage = computed(() => {
      return props.errorMessage;
    });

    return () => {
      children.value = slots.default?.();
      return (
        <div class={cls.value} {...attrs}>
          {props.label && (
            <label
              style={labelWidthStyle.value}
              for={props.name}
              class="text-sm font-medium leading-6 text-gray-900 flex items-center justify-end gap-x-0.5 text-right"
            >
              <span>{props.label}</span>
              {props.required && <span class="text-red-600">*</span>}
            </label>
          )}
          <div class="relative w-full">
            {children.value}
            {fieldErrorMessage && (
              <span class="mt-1 absolute text-sm text-red-600">
                {fieldErrorMessage}
              </span>
            )}
          </div>
        </div>
      );
    };
  },
});
