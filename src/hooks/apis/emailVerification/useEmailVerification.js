import { useMutation } from '@tanstack/react-query';

import { emailVerificationRequest } from '@/apis/auth';
import { useToast } from '@/hooks/use-toast';

export const useEmailVerification = () => {
    const { toast } = useToast();
    const { isSuccess, isPending, error, mutateAsync: emailVerificationMutation } = useMutation({
        mutationFn: emailVerificationRequest,
        onSuccess: (data) => {
            console.log('Email verification successful', data);
            toast({
                title: 'Verified',
                message: 'Email Verification Successfull',
                type: 'success'
            });
        },
        onError: (error) => {
            console.log('Error while verifying email id ', error);
            toast({
                title: 'Failed to verify email id',
                message: error.message,
                type: 'error',
                variant: 'destructive'
            });
        }
    }) ;
    return {
        emailVerificationMutation,
        isSuccess,
        isPending,
        error
    };
};