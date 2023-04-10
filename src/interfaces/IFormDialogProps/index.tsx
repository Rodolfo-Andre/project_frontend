interface IFormDialogProps {
  open: boolean;
  handleCancel: () => void;
  handleSuccess: () => Promise<void> | void;
  title: string;
}

export default IFormDialogProps;
