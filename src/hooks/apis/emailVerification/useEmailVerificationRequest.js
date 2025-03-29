import { useMutation } from '@tanstack/react-query';

import { emailVerificationLinkRequest } from '@/apis/auth';
import { useToast } from '@/hooks/use-toast';

export const useEmailVerificationRequest = () => {
    const { toast } = useToast();
    const { isSuccess, isPending, error, mutateAsync: emailVerificationRequestMutation } = useMutation({
        mutationFn: emailVerificationLinkRequest,
        onSuccess: (data) => {
            console.log('Email verification link sent', data);
            toast({
                title: 'Link Sent',
                message: 'Email Verification link sent',
                type: 'success'
            });
        },
        onError: (error) => {
            console.log('Error while sending verification link ', error);
            toast({
                title: 'Failed to send link',
                message: error.message,
                type: 'error',
                variant: 'destructive'
            });
        }
    });

    return {
        emailVerificationRequestMutation,
        isSuccess,
        isPending,
        error
    };
};