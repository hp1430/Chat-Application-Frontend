import { useMutation, useQueryClient } from '@tanstack/react-query';

import { resetJoinCodeRequest } from '@/apis/auth/workspaces';

import { useAuth } from '../context/useAuth';

export const useResetJoinCode = (workspaceId) => {
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    const { mutateAsync: resetJoinCodeMutation, isSuccess, isPending, error } = useMutation({
        mutationFn: () => resetJoinCodeRequest({ workspaceId, token: auth?.token }),
        onSuccess: (data) => {
            console.log('Join code reset successfully', data);
            queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`);
        },
        onError: (error) => {
            console.log('Error resetting join code', error);
        }
    });
    return {
        resetJoinCodeMutation,
        isSuccess,
        isPending,
        error
    };
};