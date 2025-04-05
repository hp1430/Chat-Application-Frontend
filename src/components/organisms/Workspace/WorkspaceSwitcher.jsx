import { Loader } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useFetchWorkspace } from '@/hooks/workspaces/useFetchWorkspace';
import { useGetWorkspaceById } from '@/hooks/workspaces/useGetWorkspaceById';

export const WorkspaceSwitcher = () => {

    const  navigate = useNavigate();

    const { workspaceId } = useParams();

    const { isFetching, workspace } = useGetWorkspaceById(workspaceId);

    const { workspaces, isFetching: isFetchingWorkspace } = useFetchWorkspace();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl'
                >
                    {isFetching ? (<Loader className='animate-spin size-5' />) : workspace?.name.charAt(0).toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    className='cursor-pointer flex-col justify-start items-start'
                >
                    {workspace?.name}
                    <span className='text-xs text-muted-foreground'>
                        (Active Workspace)
                    </span>
                </DropdownMenuItem>
                {isFetchingWorkspace ? ( <Loader className='animate-spin size-5' />) : (
                    workspaces?.map((workspace) => {
                        if(workspace._id === workspaceId) return null;
                        return (
                            <DropdownMenuItem
                                className='cursor-pointer flex-col justify-start items-start'
                                onClick={() => navigate(`/workspaces/${workspace._id}`)}
                                key={workspace._id}
                            >
                                <p className='truncate'>{workspace?.name}</p>
                            </DropdownMenuItem>
                        );
                    })
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};