import axios from '@/config/axiosConfig';

export const getChannelById = async({ channelId, token }) => {
    try {
        const response = await axios.get(`/channels/${channelId}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    }
    catch(error) {
        console.error('Error fetching channel by ID:', error);
        throw error;
    }
};

export const getPaginatedMessages = async ({ channelId, limit, offset, token }) => {
    try {
        const response = await axios.get(`/messages/${channelId}`, {
            headers: {
                'x-access-token': token
            },
            params: {
                limit: limit || 20,
                offset: offset || 0
            }
        });
        return response?.data?.data;
    }
    catch(error) {
        console.error('Error fetching paginated messages:', error);
        throw error;
    }
};