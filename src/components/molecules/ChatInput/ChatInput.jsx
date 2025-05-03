import { useQueryClient } from '@tanstack/react-query';

import { getPresignedUrl, uploadImageToAWSpresignedUrl } from '@/apis/s3';
import { Editor } from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';

export const ChatInput = () => {

    const { socket, currentChannel } = useSocket();
    const { auth } = useAuth();
    const { currentWorkspace } = useCurrentWorkspace();
    const queryClient = useQueryClient();

    async function handleSubmit({ body, image }) {
        console.log(body, image); // handle the submit event
        let fileUrl = null;
        if(image) {
            const presignedUrl = await queryClient.fetchQuery({
                queryKey: ['getPresignedUrl'],
                queryFn: () => getPresignedUrl({ token: auth?.token }),
            });

            const responseAws = await uploadImageToAWSpresignedUrl({
                url: presignedUrl,
                file: image
            });
            fileUrl = presignedUrl.split('?')[0];
        }
        socket?.emit('NewMessage', {
            channelId: currentChannel,
            body: body,
            image: fileUrl,
            senderId: auth?.user?._id,
            workspaceId: currentWorkspace?._id
        }, (data) => {
            console.log('successfully sent message', data);
            // handle the response from the server
        });
    }

    return (
        <div
            className="px-5 w-full"
        >
            <Editor 
                placeholder="Type a message..."
                onSubmit={handleSubmit}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""
            />
        </div>
    );
};