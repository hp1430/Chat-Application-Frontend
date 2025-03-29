import axios from '@/config/axiosConfig';

export const signUpRequest = async ({ email, password, username }) => {
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

export const signInRequest = async ({ email, password }) => {
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

export const forgotPasswordRequest = async ({ email }) => {
    try {
        const response = await axios.post('passwordreset/request', {email});
        return response.data;
    }
    catch(error) {
        console.log(error);
        throw error.response.data;
    }
};

export const resetPasswordRequest = async ({ password, id, token }) => {
    try {
        const response = await axios.put(`passwordreset?id=${id}&token=${token}`, { 
            password: password
        });
        return response.data;
    }
    catch(error) {
        console.log(error);
        throw error.response.data;
    }
};

export const emailVerificationRequest = async({ token }) => {
    try{
        const response = await axios.put(`/users/verify/${token}`);
        return response.data;
    }
    catch(error) {
        console.log(error);
        throw error.response.data;
    }
};

export const emailVerificationLinkRequest = async({ email }) => {
    try{
        const response = await axios.post('/users/verify', {
            email: email
        });
        return response.data;
    }
    catch(error) {
        console.log(error);
        throw error.response.data;
    }
};