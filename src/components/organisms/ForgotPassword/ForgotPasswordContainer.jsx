import { useState } from 'react';

import { useForgotPassword } from '@/hooks/apis/forgotPassword/useForgotPassword';

import { ForgotPassword } from './ForgotPassword';

export const ForgotPasswordContainer = () => {
    const [email, setEmail] = useState('');
    const [validationError, setvalidationError] = useState(null);
    const { isSuccess, isPending, error, forgotPasswordMutation } = useForgotPassword();

    const onForgotPasswordFormSubmit = async (e) => {
        e.preventDefault();

        if(!email) {
            console.log('Please enter the email');
            setvalidationError({ message: 'Please enter the email' });
            return;
        }
        
        await forgotPasswordMutation({
            email: email
        });

        setEmail('');
    };
    return (
        <ForgotPassword 
            email={email}
            setEmail={setEmail}
            isSuccess={isSuccess}
            isPending={isPending}
            error={error}
            onForgotPasswordFormSubmit={onForgotPasswordFormSubmit}
            validationError={validationError}
        />
    );
};