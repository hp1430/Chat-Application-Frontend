import { useMutation } from '@tanstack/react-query';

import { joinWorkspaceRequest } from '@/apis/auth/workspaces';

import { useAuth } from '../context/useAuth';

export const useJoinWorkspaceRequest = (workspaceId) => {
    const { auth } = useAuth();
    const { mutateAsync: joinWorkspaceMutation, error, isSuccess, isPending } = useMutation({
        mutationFn: (joinCode) => joinWorkspaceRequest({ workspaceId, joinCode, token: auth?.token }),
        onSuccess: () => {
            console.log('Joined workspace successfully');
        },
        onError: (error) => {
            console.log('Error joining workspace', error);
        }
    });

    return {
        joinWorkspaceMutation,
        error,
        isSuccess,
        isPending
    };
};