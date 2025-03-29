import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmailVerification } from '@/hooks/apis/emailVerification/useEmailVerification';

export const EmailVerification = () => {
    const { emailVerificationMutation, isSuccess, isPending, error } = useEmailVerification();
    const { token } = useParams();
    const navigate = useNavigate();

    const onEmailVerificationButtonClick = (e) => {
        e.preventDefault();
        emailVerificationMutation({
            token:token
        });
    };

    useEffect(() => {
        if(isSuccess) {
            setTimeout(() => {
                navigate('/auth/signin');
            }, 3000);
        }
    }, [isSuccess, navigate]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Verification</CardTitle>
                <CardDescription>Click the button below to verify your email id</CardDescription>

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
                            Email Verification Successfull. You will be redirected to signin page in few seconds
                            <LucideLoader2 className='animate-spin ml-2' />
                        </p>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <form className='space-y-3' onSubmit={onEmailVerificationButtonClick}>
                    <Button className='w-full' disabled={isPending} size="lg" type="submit">
                        Verify
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};