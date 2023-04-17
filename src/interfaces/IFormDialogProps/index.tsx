interface IFormDialogProps {
  open: boolean;
  isSubmitting?: boolean;
  handleCancel: () => void;
  handleSuccess: () => Promise<void> | void;
  title: string;
}

export default IFormDialogProps;
