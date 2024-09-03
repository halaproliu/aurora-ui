export interface ProgressProps {
    /**
     * 进度条的颜色
     */
    color?: string;
    /**
     * 
     */
    inactiveColor?: string;
    /**
     * 进度条的宽度
     */
    size: string | number;
    /**
     * 进度条的值
     */
    percent?: number;
    /**
     * 进度条的高度
     */
    height?: string;
    /**
     * 进度条线的宽度
     */
    strokeWidth?: number;
    /**
     * 进度条是否显示文字
     * */
    showText?: boolean;
}