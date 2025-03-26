import { SignupCard } from '@/components/organisms/Auth/SignupCard';

export const Auth = () => {
    return (
        <div
            className="h-screen flex items-center justify-center bg-slack"
        >
            <div className="md:h-auto md:w-[420px]">
                <SignupCard />
            </div>
        </div>
    );
};