import combineContext from '@/utils/combineContext';

import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceCOntext';

export const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider
);