import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useToast } from '@/hooks/use-toast';
import { useDeleteWorkspace } from '@/hooks/workspaces/useDeleteWorkspace';

export const WorkspacePreferencesModal = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [workspaceId, setWorkspaceId] = useState(null);

    const { initialValue, openPreferences, setOpenPreferences, workspace } = useWorkspacePreferencesModal();
    const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);

    useEffect(() => {
        setWorkspaceId(workspace?._id);
    }, [workspace]);

    async function handleDelete() {
        try {
            await deleteWorkspaceMutation();
            navigate('/home');
            queryClient.invalidateQueries('fetchWorkspaces');
            setOpenPreferences(false);
            toast({
                title: 'Workspace deleted successfully',
                type: 'success'
            });
        }
        catch(error) {
            console.log('Error in deleting the workspce', error);
            toast({
                title: 'Error in deleting the workspace',
                type: 'error'
            });
        }
    }

    return (
        <Dialog open={openPreferences} onOpenChange={setOpenPreferences}>
            <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
                <DialogHeader className='p-4 border-b bg-white'>
                    <DialogTitle>
                        {initialValue}
                    </DialogTitle>
                </DialogHeader>

                <div className='px-4 pb-4 flex flex-col gap-y-2'>
                    <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
                        <div className='flex items-center justify-between'>
                            <p className='font-semibold text-sm'>
                                Workspace Name
                            </p>
                            <p className='text-sm font-semibold hover:underline'>
                                Edit
                            </p>
                        </div>

                        <p className='text-sm'>
                            {initialValue}
                        </p>
                    </div>

                    <button 
                        className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg'
                        onClick={handleDelete}
                    >
                        <TrashIcon className='size-5' />
                        <p
                            className='text-sm font-semibold'
                        >
                            Delete Workspace
                        </p>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};