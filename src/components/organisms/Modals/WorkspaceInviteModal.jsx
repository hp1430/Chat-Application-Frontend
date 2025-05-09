import { CopyIcon, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useResetJoinCode } from '@/hooks/workspaces/useResetJoinCode';

export const WorkspaceInviteModal = ({ openInviteModal, setOpenInviteModal, workspaceName, joinCode, workspaceId }) => {

    const { toast } = useToast();

    const {resetJoinCodeMutation} = useResetJoinCode(workspaceId);

    async function handleCopy() {
        const inviteLink = `${joinCode}`;
        await navigator.clipboard.writeText(inviteLink);
        toast({
            title: 'Link copied to clipboard',
            type: 'success'
        });
    }

    async function handleResetCode() {
        try {
            await resetJoinCodeMutation();
            toast({
                title: 'Join code reset successfully',
                type: 'success'
            });
        }
        catch(error) {
            console.log('Error resetting join code', error);
            toast({
                title: 'Error resetting join code',
                type: 'error'
            });
        }
    }
    return (
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite People to {workspaceName}
                    </DialogTitle>
                    <DialogDescription>
                        Use to code shown below to invite people to your workspace.
                    </DialogDescription>
                </DialogHeader>
                <div
                    className='flex flex-col items-center justify-center py-4 gap-y-4'
                >
                    <p className='font-bold text-4xl uppercase'>
                        {joinCode}
                    </p>
                    <Button size='sm' variant='ghost' onClick={handleCopy}>
                        Copy Link
                        <CopyIcon className='size-4 ml-2' />
                    </Button>
                    {/** Link to redirect the user in a new tab to the join page */}
                    <a
                        href={`/workspaces/join/${workspaceId}`}
                        target='_blank'
                        rel='noreferrer'
                        className='text-blue-500'
                    >
                        Redirect to Join Page
                    </a>
                </div>
                <div
                    className='flex flex-col items-center justify-center w-full'
                >
                    <Button variant='outline' onClick={handleResetCode}>
                        Reset Join Code
                        <RefreshCcw className='size-4 ml-2' />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};