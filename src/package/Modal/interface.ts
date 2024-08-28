export interface ModalProps {
  title: string
  content?: string
  okText?: string
  cancelText?: string
  onOk?: () => void
  onCancel?: () => void
  hideFooter?: boolean
  zIndex?: number
  width?: number | string;
}

export interface ConfirmProps {
  title: string
  content?: string
  okText?: string
  cancelText?: string
  onOk?: () => void
  onCancel?: () => void
}
