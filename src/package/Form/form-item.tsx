import { defineComponent, inject } from 'vue';
import { FormContext, FormContextKey } from 'vee-validate';
import { FormItemProps } from './interface';

export default defineComponent<FormItemProps>({
  name: 'FormItem',
  setup(props, { slots }) {
    const formContext = inject<FormContext>(FormContextKey, {} as FormContext);
    const { defineField } = formContext;

    const [value, valueAttrs] = defineField(props.name);

    const defaultSlot = slots?.default?.();

    const handleChange = (val: any) => {
      console.log('val: ', val);
      value.value = val;
    };

    const renderSlot = () => {
      if (defaultSlot) {
        return defaultSlot.map((item) => {
          console.log('item: ', item);
          return;
        });
      }
    };

    return () => {
      return <div>{renderSlot()}</div>;
    };
  },
});
