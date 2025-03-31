import { useMutation } from '@tanstack/react-query';

import { signInRequest } from '@/apis/auth';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useSignin = () => {
    const { toast } = useToast();
    const { setAuth } = useAuth();
    const { isSuccess, isPending, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,
        onSuccess: (response) => {
            console.log('Succesfully signed in ', response);

            const userObject = JSON.stringify(response.data);
            localStorage.setItem('user', userObject);
            localStorage.setItem('token', response.data.token);
            setAuth({
                token: response.data.token,
                user: userObject,
                isLoading: false
            });
            
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