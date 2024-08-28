import { createVNode, render } from "vue";
import Message from "./message.vue";
import SimpleMessage from "./simple.vue";

const div = document.createElement("div");
document.body.appendChild(div);

let timer: any = null;

export interface MessageConfig {
    title?: string;
    content: string;
    type: "success" | "error" | "info";
    simple?: boolean; // 是否是简单模式
    duration?: number;
}

export default (({ title, content, type, duration = 2000, simple = true }: MessageConfig) => {
    const Comp = simple ? SimpleMessage : Message
    const vnode = createVNode(Comp, { title, content, type });
    render(vnode, div);

    timer && clearTimeout(timer);
    if (duration) {
        timer = window.setTimeout(() => {
            render(null, div);
        }, duration);
    }
})