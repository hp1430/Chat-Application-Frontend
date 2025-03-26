export const Auth = ({ children }) => {
    // Layout for the Auth pages
    return (
        <div
            className="h-screen flex items-center justify-center bg-slack"
        >
            <div className="md:h-auto md:w-[420px]">
                {children}
            </div>
        </div>
    );
};