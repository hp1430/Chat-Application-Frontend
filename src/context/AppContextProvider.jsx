import combineContext from '@/utils/combineContext';

import { AuthContextProvider } from './AuthContext';
import { CreateChannelContextProvider } from './CreateChannelContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceCOntext';
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext';

export const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferencesModalContextProvider,
    CreateChannelContextProvider
);