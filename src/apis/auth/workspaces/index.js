import axios from '@/config/axiosConfig';

export const createWorkspaceRequest = async ({ name, description, token }) => {
    try {
        const response = await axios.post('/workspaces', { name, description }, {
            headers: {
                'x-access-token': token
            }
        });
        console.log('Response in create workspace request', response);
        return response?.data?.data;
    }
    catch(error) {
        console.log('Error in create workspace request', error);
        throw error.response.data;
    }
};

export const fetchWorkspacesRequest = async ({ token }) => {
    try {
        const response = await axios.get('/workspaces', {
            headers: {
                'x-access-token': token
            }
        });
        console.log('Response in fetch workspace request', response);
        return response?.data.data;
    }
    catch(error) {
        console.log('Error in fetching workspace request', error);
        throw error.response.data;
    }
};

export const fetchWorkspaceDetailsRequest = async({ workspaceId, token }) => {
    try {
        console.log('Fetching workspace details for ID:', workspaceId);
        const response = await axios.get(`/workspaces/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    }
    catch(error) {
        console.log('Error in fetching workspace details request', error);
        throw error.response.data;
    }
};

export const deleteWorkspaceRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.delete(`/workspaces/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    }
    catch(error) {
        console.log('Error deleting workspace request');
        throw error.response.data;
    }
};

export const updateWorkspaceRequest = async ({ workspaceId, name, token }) => {
    try{
        const response = await axios.put(`/workspaces/${workspaceId}`, { name }, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    }
    catch(error) {
        console.log('Error updating workspace request');
        throw error.response.data;
    }
};

export const addChannelToWorkspaceRequest = async ({ workspaceId, channelName, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/channels`, { channelName }, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    }
    catch(error) {
        console.log('Error adding channel to workspace request');
        throw error.response.data;
    }
};

export const resetJoinCodeRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/joinCode/reset`, {}, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    }
    catch(error) {
        console.log('Error resetting join code request');
        throw error.response.data;
    }
};

export const addMemberToWorkspaceRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/members`, {}, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    }
    catch(error) {
        console.log('Error adding member to workspace request');
        throw error.response.data;
    }
};

export const joinWorkspaceRequest = async ({ workspaceId, joinCode, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/join`, { joinCode }, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    }
    catch(error) {
        console.log('Error joining workspace request');
        throw error.response.data;
    }
};