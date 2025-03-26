import { useMutation } from '@tanstack/react-query';

import { signUpRequest } from '@/apis/auth';

export const useSignup = () => {
    const { isPending, isSuccess, error, mutate: signupMutation } = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log('Succesfully sign up ', data);
        },
        onError: (error) => {
            console.log('Error signing up ', error);
        }
    });
    return {
        isPending,
        isSuccess,
        error,
        signupMutation
    };
};