import axios from 'axios';
import { ApiResponse } from '../types';

// The webhook URL for the n8n workflow
const N8N_WEBHOOK_URL = 'https://n8n-1-nasm.onrender.com/webhook-test/road';

export const generateRoadmap = async (topic: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post(N8N_WEBHOOK_URL, 
      { topic },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Enable CORS credentials
        withCredentials: false
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    // Return a default response structure on error
    return {
      roadmap: []
    };
  }
};