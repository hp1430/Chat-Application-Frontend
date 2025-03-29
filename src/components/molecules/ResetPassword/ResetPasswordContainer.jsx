import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useResetPassword } from '@/hooks/apis/forgotPassword/useResetPassword';

import { ResetPassword } from './ResetPassword';

export const ResetPasswordContainer = () => {
    const [password, setPassword] = useState('');
    const [validationError, setvalidationError] = useState(null);
    const { isSuccess, isPending, error, resetPasswordMutation } = useResetPassword();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    const onResetPasswordFormSubmit = async (e) => {
        e.preventDefault();

        if(!password) {
            console.log('Please enter the password');
            setvalidationError({ message: 'Please enter the password' });
            return;
        }
        
        await resetPasswordMutation({
            password: password,
            id: id,
            token: token
        });

        setPassword('');
    };
    return (
        <ResetPassword
            password={password}
            setPassword={setPassword}
            isSuccess={isSuccess}
            isPending={isPending}
            error={error}
            onResetPasswordFormSubmit={onResetPasswordFormSubmit}
            validationError={validationError}
        />
    );
};