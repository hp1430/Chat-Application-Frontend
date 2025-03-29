import { TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const ForgotPassword = ({
    email,
    setEmail,
    isSuccess,
    isPending,
    error,
    onForgotPasswordFormSubmit,
    validationError
}) => {
    const navigate = useNavigate();
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>Enter Email Id to reset your password</CardDescription>

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
                            Password reset link has been successfully sent to your registered email id. Please follow the instructions mentioned in email.
                        </p>
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <form className='space-y-3' onSubmit={onForgotPasswordFormSubmit}>
                    <Input 
                        disabled={isPending}
                        placeholder='Email'
                        type='email'
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button className='w-full' disabled={isPending} size="lg" type="submit">
                        Continue
                    </Button>
                </form>

                <Separator className='my-5'/>

                <div 
                    className='flex justify-center text-sm text-sky-600 hover:underline cursor-pointer'
                    onClick={()=>navigate(-1)}
                >
                    Go Back
                </div>
            </CardContent>
        </Card>
    );
};