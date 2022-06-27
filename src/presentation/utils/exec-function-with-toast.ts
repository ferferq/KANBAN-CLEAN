import toast from 'react-hot-toast';

type execFunctionWithProcessingToastProps = {
  functionCall(): Promise<void>;
  messageSuccess: string;
};

export const execFunctionWithProcessingToast = async ({
  functionCall,
  messageSuccess,
}: execFunctionWithProcessingToastProps): Promise<void> => {
  try {
    await functionCall();
    toast.success(messageSuccess);
  } catch (error) {
    toast.error(error.message);
  }
};
