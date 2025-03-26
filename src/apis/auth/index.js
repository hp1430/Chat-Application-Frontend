import axios from '@/config/axiosConfig';

export const sighnUpRequest = async ({ email, password, username }) => {
    try {
        const response = await axios.post('/users/signup', {
            email,
            password,
            username
        });
        return response.data;
    }
    catch(error) {
        console.log(error);
        throw error.response.data;
    }
};

export const sighnInRequest = async ({ email, password }) => {
    try {
        const response = await axios.post('/users/signin', {
            email,
            password
        });
        return response.data;
    }
    catch(error) {
        console.log(error);
        throw error.response.data;
    }
};