import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Badge',
  props: {
    dot: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'gray',
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const { type, border } = props;
    const badgeClass = computed(() => [
      'inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium',
      {
        'bg-gray-100 text-gray-600': type === 'gray',
        'bg-red-100 text-red-700': type === 'red',
        'bg-yellow-100 text-yellow-800': type === 'yellow',
        'bg-green-100 text-green-700': type === 'green',
        'bg-blue-100 text-blue-700': type === 'blue',
        'bg-indigo-100 text-indigo-700': type === 'indigo',
        'bg-purple-100 text-purple-700': type === 'purple',
        'bg-pink-100 text-pink-700': type === 'pink',
      },
      {
        'ring-1 ring-inset': border,
      },
      {
        'ring-gray-500/10': type === 'gray' && border,
        'ring-red-600/10': type === 'red' && border,
        'ring-yellow-600/10': type === 'yellow' && border,
        'ring-green-600/10': type === 'green' && border,
        'ring-blue-700/10': type === 'blue' && border,
        'ring-indigo-700/10': type === 'indigo' && border,
        'ring-purple-700/10': type === 'purple' && border,
        'ring-pink-700/10': type === 'pink' && border,
      },
    ]);
    const iconClass = computed(() => [
      'h-1.5 w-1.5',
      {
        'fill-gray-400': type === 'gray',
        'fill-red-500': type === 'red',
        'fill-yellow-500': type === 'yellow',
        'fill-green-500': type === 'green',
        'fill-blue-500': type === 'blue',
        'fill-indigo-500': type === 'indigo',
        'fill-purple-500': type === 'purple',
        'fill-pink-500': type === 'pink',
      },
    ]);
    return (
      <span class={badgeClass}>
        {props.dot && (
          <svg class={iconClass} viewBox="0 0 6 6" aria-hidden="true">
            <circle cx="3" cy="3" r="3" />
          </svg>
        )}
        {slots.default?.()}
      </span>
    );
  },
});
