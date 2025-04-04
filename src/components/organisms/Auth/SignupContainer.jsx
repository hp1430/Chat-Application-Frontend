import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignup } from '@/hooks/apis/auth/useSignup';

import { SignupCard } from './SignupCard';

export const SignupContainer = () => {
    const navigate = useNavigate();
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    const { isPending, isSuccess, error, signupMutation } = useSignup();

    const [validationError, setValidationError] = useState(null);

    async function onSignupFormSubmit(e) {
        e.preventDefault();
        console.log('Signup form submitted', signupForm);

        if(!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username) {
            console.log('All fields are required');
            setValidationError({ message: 'All fields are required'});
            return;
        }

        if(signupForm.password != signupForm.confirmPassword) {
            console.log('Passwords do not match');
            setValidationError({ message: 'Passwords do not match'});
            return;
        }

        setValidationError(null);

        await signupMutation({
            email: signupForm.email,
            password: signupForm.password,
            username: signupForm.username
        });
    }

    useEffect(() => {
        if(isSuccess){
            setTimeout(()=>{
                navigate('/users/verify', { state: { incomingEmail: signupForm.email }});
            }, 5000);
        }
    }, [isSuccess, navigate, signupForm.email]);

    return (
        <SignupCard 
            error={error}
            isPending={isPending}
            isSuccess={isSuccess}
            signupForm={signupForm} 
            setSignupForm={setSignupForm} 
            validationError={validationError} 
            onSignupFormSubmit={onSignupFormSubmit}
        />
    );
};