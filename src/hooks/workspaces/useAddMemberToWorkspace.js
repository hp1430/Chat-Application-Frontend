import { useMutation } from '@tanstack/react-query';

import { addMemberToWorkspaceRequest } from '@/apis/auth/workspaces';

import { useAuth } from '../context/useAuth';

export const useAddMemeberToWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const { mutateAsync: addMemberToWorkspaceMutation, error, isSuccess, isPending } = useMutation({
        mutationFn: () => addMemberToWorkspaceRequest({ workspaceId, token: auth?.token }),
        onSuccess: () => {
            console.log('Member added to workspace successfully');
        },
        onError: (error) => {
            console.log('Error adding member to workspace', error);
        }
    });

    return {
        addMemberToWorkspaceMutation,
        error,
        isSuccess,
        isPending
    };
};