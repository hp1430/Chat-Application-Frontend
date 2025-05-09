import { LogOutIcon, PencilIcon, SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import { useToast } from '@/hooks/use-toast';

export const UserButton = () => {
    const { toast } = useToast();
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    if(auth.isLoading) return null;

    console.log('Auth: ', auth);
    
    async function handleLogout() {
        await logout();
        toast({
            title: 'Successfully signed out',
            type: 'success'
        });
        
        navigate('/auth/signin');
    }

    function handleFunction() {
        setOpenCreateWorkspaceModal(true);
    }

    const user = typeof auth.user === 'string' ? JSON.parse(auth.user) : auth.user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className='size-10 hover:opacity-65'>
                    {user?.avatar && <AvatarImage src={user.avatar} />}
                    <AvatarFallback>{user?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem onClick={handleFunction}>
                    <PencilIcon className='size-4 mr-2 h-10' />
                    Create Workspace
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SettingsIcon className='size-4 mr-2 h-10' />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className='size-4 mr-2 h-10'/>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};