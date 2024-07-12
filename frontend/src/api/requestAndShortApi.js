import axios from 'axios';

// const API_URL = '/api/profiles/';

const getShortlistedProfiles = async () => {
  try {
    const response = await axios.get('/shortlisted', { withCredentials: true });
    console.log('res short',response)
    return response.data.flat(); 
  } catch (error) {
    console.error('Error fetching shortlisted by profiles:', error);
    return [];
  }
};

const getShortlistedByProfiles = async () => {
  try {
    const response = await axios.get('/shortlisted-by', { withCredentials: true });
    return response.data.flat(); 
  } catch (error) {
    console.error('Error fetching shortlisted by profiles:', error);
    return [];
  }
  
};

const getRequestsSentProfiles = async () => {
  const response = await axios.get('/requests-sent');
  console.log('request sent profile',response)
  return response.data;
};

const getRequestsInProfiles = async () => {
  const response = await axios.get('/requests-in');
  return response.data;
};

const getRequestsAcceptedProfiles = async () => {
  const response = await axios.get('/requests-accept');
  return response.data;
};

const getRequestsRejectedProfiles = async () => {
  const response = await axios.get('/requests-reject');
  return response.data;
};

const acceptRequest = async (profileId) => {
  await axios.post('/requests/accept', { profileId });
};

const rejectRequest = async (profileId) => {
  await axios.post('/requests/reject', { profileId });
};

const cancelRequest = async (profileId) => {
  await axios.post('/requests/cancel', { profileId });
};


export { 
  getShortlistedProfiles, 
  getShortlistedByProfiles, 
  getRequestsSentProfiles, 
  getRequestsInProfiles, 
  getRequestsAcceptedProfiles, 
  getRequestsRejectedProfiles,
  acceptRequest, 
  rejectRequest, 
  cancelRequest
};
