import { computed, defineComponent, PropType } from 'vue';
import { ButtonProps } from './interface';
// import { }

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String as PropType<ButtonProps['type']>,
      default: 'default',
    },
    size: {
      type: String as PropType<ButtonProps['size']>,
      default: 'medium',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const { type, size } = props;
    const cls = computed(() => [
      'rounded font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
      {
        'text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600':
          type === 'indigo',
        'text-white bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600':
          type === 'primary',
        'text-white bg-red-600 hover:bg-red-500 focus-visible:outline-red-600':
          type === 'danger',
        'text-white bg-green-600 hover:bg-green-500 focus-visible:outline-green-600':
          type === 'success',
        'text-white bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600':
          type === 'warn',
        'text-white bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600':
          type === 'default',
        'text-white bg-pink-600 hover:bg-pink-500 focus-visible:outline-pink-600':
          type === 'pink',
        'text-white bg-purple-600 hover:bg-purple-500 focus-visible:outline-purple-600':
          type === 'purple',
      },
      {
        'px-2 py-1 text-xs': size === 'xs',
        'px-2 py-1 text-sm': size === 'sm',
        'px-2.5 py-1.5 text-sm': size === 'md',
        'px-3 py-2 text-sm': size === 'lg',
        'px-3.5 py-2.5 text-sm': size === 'xl',
      },
    ]);
    const children = slots?.default?.();
    return () => (
      <button type="button" class={cls.value} disabled={props.disabled}>
        {children}
      </button>
    );
  },
});
