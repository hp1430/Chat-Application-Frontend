import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useToast } from '@/hooks/use-toast';
import { useAddChannelToWorkspace } from '@/hooks/workspaces/useAddChannelToWorkspace';

export const CreateChannelModal = () => {
    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();

    const [channelName, setChannelName] = useState('');

    const { addChannelToWorkspaceMutation } = useAddChannelToWorkspace();

    const { currentWorkspace } = useCurrentWorkspace();

    const { toast } = useToast();

    const queryClient = useQueryClient();

    function handleClose() {
        setOpenCreateChannelModal(false);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        await addChannelToWorkspaceMutation({
            workspaceId: currentWorkspace?._id,
            channelName: channelName
        });

        toast({
            title: 'Channel created successfully',
            type: 'success'
        });

        queryClient.invalidateQueries(`fetchWorkspaceById-${currentWorkspace?._id}`);

        handleClose();
    }

    return (
        <Dialog
            open = {openCreateChannelModal}
            onOpenChange={handleClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Channel</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit}>
                    <Input 
                        value = {channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        minLength={3}
                        placeholder='Channel Name e.g. team-announcements'
                        required
                    />

                    <div className='flex justify-end mt-4'>
                        <Button>Create Channel</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};