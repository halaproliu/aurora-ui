import { computed, defineComponent, ref, inject } from 'vue';
import { FormContext, FormContextKey } from 'vee-validate';
import { FormItemProps } from './interface';
import { isNumber } from '@/utils/is';

export default defineComponent({
  name: 'FormItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'horizontal', // horizontal, vertical
    },
    labelWidth: {
      type: [String, Number],
    },
    required: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
    },
  },
  setup(props, { slots, attrs }) {
    const formContext = inject<FormContext>(FormContextKey, {} as FormContext);
    const { defineField, errors } = formContext;
    const { width, direction } = props;
    console.log('props: ', props);
    const children = ref();

    const [value, valueAttrs] = defineField(props.name);

    const defaultSlot = slots?.default?.();

    const handleChange = (val: any) => {
      console.log('val: ', val);
      value.value = val;
    };

    const labelWidthStyle = computed(() => {
      if (isNumber(width)) {
        return {
          minWidth: `${width}px`,
        };
      } else {
        return {
          minWidth: width || '60px',
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
      return errors.value[props.name];
    });

    return () => {
      children.value = slots.default?.(valueAttrs);
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
