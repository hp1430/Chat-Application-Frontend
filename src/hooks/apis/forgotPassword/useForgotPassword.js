import { useMutation } from '@tanstack/react-query';

import { forgotPasswordRequest } from '@/apis/auth';
import { useToast } from '@/hooks/use-toast';

export const useForgotPassword = () => {
    const { toast } = useToast();
    const { isSuccess, isPending, error, mutateAsync: forgotPasswordMutation } = useMutation({
        mutationFn: forgotPasswordRequest,
        onSuccess: (data) => {
            console.log('Password reset mail sent successfully', data);
            toast({
                title: 'Mail sent',
                message: 'Password reset mail sent successfully',
                type: 'success'
            });
        },
        onError: (error) => {
            console.log('Error while sending reset password mail ', error);
            toast({
                title: 'Failed to send reset password mail',
                message: error.message,
                type: 'error',
                variant: 'destructive'
            });
        }
    });
    return {
        forgotPasswordMutation,
        isSuccess,
        isPending,
        error
    };
};