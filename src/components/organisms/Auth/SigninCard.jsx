import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const SigninCard = ({
    signinForm,
    setSigninForm,
    onSigninFormSubmit,
    validationError,
    error,
    isSuccess,
    isPending
}) => {

    const navigate = useNavigate();

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>

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
                        {error.message === 'Email id is not verified' && (
                            <p className='text-sky-600 hover:underline cursor-pointer' onClick={() => navigate('/users/verify')}>Verify</p>
                        )}
                    </div>
                )}

                {isSuccess && (
                    <div className='bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5'>
                        <FaCheck className='size-5'/>
                        <p>
                            Successfully signed in. You will be redirected to the homepage in few seconds.
                            <LucideLoader2 className='animate-spin ml-2' />
                        </p>
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <form className='space-y-3' onSubmit={onSigninFormSubmit}>
                    <Input 
                        disabled={isPending}
                        placeholder='Email'
                        type='email'
                        value={signinForm.email}
                        required
                        onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
                    />
                    <Input 
                        disabled={isPending}
                        placeholder='Password'
                        type='password'
                        value={signinForm.password}
                        required
                        onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
                    />

                    <Button className='w-full' disabled={isPending} size="lg" type="submit">
                        Continue
                    </Button>
                </form>

                <Separator className='my-5' />

                <p 
                    className='text-sm mt-4 hover:underline cursor-pointer'
                    onClick={() => navigate('/forgotpassword/request')}
                >
                    Forgot Password
                </p>

                <p
                    className='text-sm text-muted-foreground mt-4'
                >
                    Do not have an account? {'  '}
                    <span 
                        className='text-sky-600 hover:underline cursor-pointer'
                        onClick={() => navigate('/auth/signup')}
                    >
                        Sign Up
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};