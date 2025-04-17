import { useMutation } from '@tanstack/react-query';

import { deleteWorkspaceRequest } from '@/apis/auth/workspaces';

import { useAuth } from '../context/useAuth';

export const useDeleteWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const { isPending, isSuccess, error, mutateAsync: deleteWorkspaceMutation } = useMutation({
        mutationFn: () => deleteWorkspaceRequest({ workspaceId, token: auth?.token }),
        onSuccess: () => {
            console.log('Workspace deleted successfully');
        },
        onError: () => {
            console.log('Error in deleting the workspace', error);
        }
    });
    return {
        isPending,
        isSuccess,
        error,
        deleteWorkspaceMutation
    };
};