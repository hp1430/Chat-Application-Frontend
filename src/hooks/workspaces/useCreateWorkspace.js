import { useMutation } from '@tanstack/react-query';

import { createWorkspaceRequest } from '@/apis/auth/workspaces';

import { useAuth } from '../context/useAuth';

export const useCreateWorkspace = () => {
    const { auth } = useAuth();

    const { isPending, isSuccess, error, mutateAsunc: createWorkspaceMutation } = useMutation({
        mutationFn: (data) => createWorkspaceRequest({ ...data, token: auth.token }),
        onSuccess: (data) => {
            console.log('Successfully created workspace', data);
        },
        onError: (error) => {
            console.log('Failed to create workspace', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error, createWorkspaceMutation
    };
};