import { useQueryClient } from '@tanstack/react-query';
import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { Message } from '@/components/molecules/Message/Message';
import { useGetChannelById } from '@/hooks/apis/channels/useGetChannelById';
import { useGetChannelMessages } from '@/hooks/apis/channels/useGetChannelMessages';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';

export const Channel = () => {

    const { channelId } = useParams();

    const queryClient = useQueryClient();

    const { channelDetails, isFetching, isError } = useGetChannelById(channelId);

    const { setMessageList, messageList } = useChannelMessages();

    const { joinChannel } = useSocket();

    const { messages, isSuccess } = useGetChannelMessages(channelId);

    useEffect(() => {
        queryClient.invalidateQueries('getpaginated Messages'); // invalidate the query to refetch the messages when the channelId changes
    }, [channelId, queryClient]);

    useEffect(() => {
        if(!isFetching && !isError) {
            joinChannel(channelId); // join the channel when the channel details are fetched successfully
        }
    }, [isFetching, isError, joinChannel, channelId]);

    useEffect(() => {
        if(isSuccess) {
            setMessageList(messages); // set the messages in the context when the messages are fetched successfully
        }
    }, [isSuccess, messages, setMessageList, channelId]);

    if(isFetching) {
        return (
            <div
                className='h-full flex-1 flex items-center justify-center'
            >
                <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
            </div>
        );
    }

    if(isError) {
        return (
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlertIcon className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel Not found</span>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-full'>
            <ChannelHeader name={channelDetails?.name} />

            {messageList?.map((message) => {
                return <Message key={message._id} body={message.body} authorImage={message.senderId?.avatar} authorName={message.senderId?.username} createdAt={message.createdAt} />;
            })}

            <div className='flex-1' />
            <ChatInput />
        </div>
    );
};