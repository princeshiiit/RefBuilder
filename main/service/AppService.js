import axios from 'axios';

const API_BASE_URL = 'https://652271b7f43b17938414820b.mockapi.io/v1/techexam/TechExamAPI';
const NODE_GET_ENDPOINT = 'http://localhost:3000/api/getsampledata';
const NODE_POST_ENDPOINT = 'http://localhost:3000/api/postdata';

const handleResponse = (response) => {
  if (response.status === 201 || response.status === 200) {
    console.log('Data submitted successfully:', response.data);
    return JSON.stringify(response.data);
  } else {
    console.error('Failed to submit/get data. Status Code:', response.status);
    throw new Error('Failed to submit/get data');
  }
};

export const PostReferralBuilderService = async (formData) => {
  try {
    const response = await axios.post(NODE_POST_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    try {
      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error submitting data:', error.message);
      throw error;
    }
  }
};

export const GetReferralBuilderService = async () => {
  try {
    const response = await axios.get(NODE_GET_ENDPOINT);
    return handleResponse(response);
  } catch (error) {
    try {
      const response = await axios.get(API_BASE_URL);
      return handleResponse(response);
    } catch (error) {
      console.error('Error getting data:', error.message);
      throw error;
    }
  }
};
