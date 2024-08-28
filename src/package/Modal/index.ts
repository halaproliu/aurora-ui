import { createVNode, render } from "vue";
import Modal from './modal.vue';
import Confirm from './confirm.vue'
import { ModalProps, ConfirmProps } from './interface';


Modal.confirm = (cfg: ConfirmProps) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const close = () => {
        render(null, div);
        document.body.removeChild(div);
    }
    const vnode = createVNode(Confirm, {...cfg, onOk: () => {
        cfg.onOk && cfg.onOk();
        close()
    }, onCancel: () => {
        cfg.onCancel && cfg.onCancel();
        close()
    }});
    render(vnode, div);
    return close
}

export { Modal };
export type { ModalProps };