import { useParams } from 'react-router-dom';

export const Channel = () => {

    const { channelId } = useParams();

    return (
        <>
            {channelId}
        </>
    );
};