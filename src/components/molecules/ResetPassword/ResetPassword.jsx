import { TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const ResetPassword = ({
    password,
    setPassword,
    isSuccess,
    isPending,
    error,
    onResetPasswordFormSubmit,
    validationError
}) => {
    const navigate = useNavigate();
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Enter New Password</CardDescription>

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
                            Password has been updated Successfully. <p className='text-sky-600 hover:underline cursor-pointer' onClick={()=>navigate('/auth/signin')}>Click here to Signin</p>
                        </p>
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <form className='space-y-3' onSubmit={onResetPasswordFormSubmit}>
                    <Input 
                        disabled={isPending}
                        placeholder='Password'
                        type='password'
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button className='w-full' disabled={isPending} size="lg" type="submit">
                        Update Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};