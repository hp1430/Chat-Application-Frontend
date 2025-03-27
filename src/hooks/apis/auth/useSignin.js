import { useMutation } from '@tanstack/react-query';

import { signInRequest } from '@/apis/auth';
import { useToast } from '@/hooks/use-toast';

export const useSignin = () => {
    const { toast } = useToast();
    const { isSuccess, isPending, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,
        onSuccess: (data) => {
            console.log('Succesfully signed in ', data);
            toast({
                title: 'Successfully signed in',
                message: 'You will be redirected to homepage in a few seconds',
                type: 'success'
            });
        },
        onError: (error) => {
            console.log('Error signing in ', error);
            toast({
                title: 'Failed to sign in',
                message: error.message,
                type: 'error',
                variant: 'destructive'
            });
        }
    });
    return {
        signinMutation,
        isSuccess,
        isPending,
        error
    };
};