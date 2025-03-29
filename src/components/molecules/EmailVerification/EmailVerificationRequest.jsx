import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEmailVerificationRequest } from '@/hooks/apis/emailVerification/useEmailVerificationRequest';

export const EmailVerificationRequest = () => {
    const { isSuccess, isPending, error, emailVerificationRequestMutation } = useEmailVerificationRequest();
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState(null);
    const location = useLocation();
    const incomingEmail = location.state?.incomingEmail;

    const onEmailVerificationRequestFormSubmit = async (e) => {
        e.preventDefault();
        
        if(!email) {
            console.log('Please enter email id');
            setValidationError({ message: 'Please enter email id'});
            return;
        }
        
        await emailVerificationRequestMutation({
            email: email
        });

        setValidationError(null);
        setEmail('');
    };

    useEffect(() => {
        if(incomingEmail && typeof incomingEmail === 'string') {
            setEmail(incomingEmail);
        }
    }, [incomingEmail]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Verification</CardTitle>
                <CardDescription>Enter your email id for verification</CardDescription>

                {validationError && (
                    <div
                        className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'
                    >
                        <TriangleAlert className='size-5' />
                        <p>{validationError.message}</p>
                    </div>
                )}
                {error && (
                    <div
                        className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'
                    >
                        <TriangleAlert className='size-5' />
                        <p>{error.message}</p>
                    </div>
                )}

                {isSuccess && (
                    <div className='bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5'>
                        <FaCheck className='size-5'/>
                        <p>
                            Email verification link has been successfully sent to your registered email id. Follow the instructions mentioned in email.
                        </p>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <form className='space-y-3' onSubmit={onEmailVerificationRequestFormSubmit}>
                    <Input
                        disabled={isPending}
                        placeholder='Email'
                        type='email'
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button className='w-full' disabled={isPending} size="lg" type="submit">
                        Send Link
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};