import { useMutation } from '@tanstack/react-query';

import { addChannelToWorkspaceRequest } from '@/apis/auth/workspaces';

import { useAuth } from '../context/useAuth';

export const useAddChannelToWorkspace = () => {
    const { auth } = useAuth();
    const { mutateAsync: addChannelToWorkspaceMutation, isPending, isSuccess, error } = useMutation({
        mutationFn: ({ workspaceId, channelName }) => addChannelToWorkspaceRequest({ workspaceId, channelName, token: auth?.token }),
        onSuccess: (data) => {
            console.log('Channel added to workspace successfully', data);
        },
        onError: (error) => {
            console.error('Error adding channel to workspace', error);
        }
    });

    return {
        addChannelToWorkspaceMutation,
        isPending,
        isSuccess,
        error
    };
};