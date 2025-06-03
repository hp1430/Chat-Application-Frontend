import { Navigate, Route, Routes } from 'react-router-dom';

import { EmailVerification } from '@/components/molecules/EmailVerification/EmailVerification';
import { EmailVerificationRequest } from '@/components/molecules/EmailVerification/EmailVerificationRequest';
import { ResetPasswordContainer } from '@/components/molecules/ResetPassword/ResetPasswordContainer';
import { SigninContainer } from '@/components/organisms/Auth/SigninContainer';
import { SignupContainer } from '@/components/organisms/Auth/SignupContainer';
import { ForgotPasswordContainer } from '@/components/organisms/ForgotPassword/ForgotPasswordContainer';
import { Auth } from '@/pages/Auth/Auth';
import { NotFound } from '@/pages/NotFound/NotFound';

import { ProtectedRoute } from './components/molecules/ProtectedRoute/ProtectedRoute';
import { Home } from './pages/Home/Home';
import { Payments } from './pages/Payments/Payments';
import { Channel } from './pages/Workspace/Channel/Channel';
import { JoinPage } from './pages/Workspace/JoinPage';
import { WorkspaceLayout } from './pages/Workspace/Layout';

export const AppRoutes = () => {
    return (
        <Routes>
          <Route path='/' element={<Navigate to='/auth/signin' />} />
          <Route path="/auth/signup" element={<Auth><SignupContainer /></Auth>} />
          <Route path="/auth/signin" element={<Auth><SigninContainer /></Auth>} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/workspaces/:workspaceId' element={<ProtectedRoute><WorkspaceLayout>Workspace</WorkspaceLayout></ProtectedRoute>} />
          <Route path='/forgotpassword/request' element={<Auth><ForgotPasswordContainer /></Auth>} />
          <Route path='/passwordreset' element={<Auth><ResetPasswordContainer /></Auth>} />
          <Route path='/users/verify/:token' element={<Auth><EmailVerification /></Auth>} />
          <Route path='/users/verify' element={<Auth><EmailVerificationRequest /></Auth>} />
          <Route 
            path='/workspaces/:workspaceId/channels/:channelId'
            element={<ProtectedRoute><WorkspaceLayout><Channel /></WorkspaceLayout></ProtectedRoute>}
          />
          <Route path='/workspaces/join/:workspaceId' element={<JoinPage />} />
          <Route path='/makepayment' element={<ProtectedRoute><Payments /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    );
};