import { useMutation } from '@tanstack/react-query';

import { updateWorkspaceRequest } from '@/apis/auth/workspaces';

import { useAuth } from '../context/useAuth';

export const useUpdateWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const { isPending, isSuccess, error, mutateAsync: updateWorkspaceMutation } = useMutation({
        mutationFn: (name) => updateWorkspaceRequest({ workspaceId, name, token: auth.token }),
        onSuccess: () => {
            console.log('Workspace update successfully');
        },
        onError: () => {
            console.log('Error in updating the workspace', error);
        }
    });
    return {
        isPending,
        isSuccess,
        error,
        updateWorkspaceMutation
    };
};