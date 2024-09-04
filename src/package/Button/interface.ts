export interface ButtonProps {
  /**
   * 按钮类型
   */
  type?:
    | 'primary'
    | 'default'
    | 'success'
    | 'warn'
    | 'indigo'
    | 'pink'
    | 'purple'
    | 'dashed'
    | 'text'
    | 'link'
    | 'ghost'
    | 'danger';
  /**
   * 按钮大小
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 按钮形状
   */
  shape?: 'circle' | 'round';

  /**
   *
   * 按钮禁用
   */
  disabled?: boolean;

  /**
   *  按钮加载状态
   */
  loading?: boolean;
}
