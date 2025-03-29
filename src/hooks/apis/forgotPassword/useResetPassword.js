import { useMutation } from '@tanstack/react-query';

import { resetPasswordRequest } from '@/apis/auth';
import { useToast } from '@/hooks/use-toast';

export const useResetPassword = () => {
    const { toast } = useToast();
    const { isSuccess, isPending, error, mutateAsync: resetPasswordMutation } = useMutation({
        mutationFn: resetPasswordRequest,
        onSuccess: (data) => {
            console.log('Password updated successfully', data);
            toast({
                title: 'Success',
                message: 'Password updated successfully',
                type: 'success'
            });
        },
        onError: (error) => {
            console.log('Error while updating password ', error);
            toast({
                title: 'Failed to update password',
                message: error.message,
                type: 'error',
                variant: 'destructive'
            });
        } 
    });
    return {
        resetPasswordMutation,
        isSuccess,
        isPending,
        error
    };
};