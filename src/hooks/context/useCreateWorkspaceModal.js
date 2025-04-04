import { useContext } from 'react';

import CreateWorkspaceContext from '@/context/CreateWorkspaceCOntext';

export const useCreateWorkspaceModal = () => {
    return useContext(CreateWorkspaceContext);
};