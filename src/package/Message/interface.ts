export interface MessageProps {
    title: string;
    /**
     * 消息类型
     */
    type?: 'success' | 'error' | 'info';
    /**
     * 消息内容
     */
    content: string;
    /**
     * 持续时间
     */
    duration?: number;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
    /**
     * 是否是简单模式
     */
    simple?: boolean;
}