import axios from 'axios';
import { ApiResponse } from '../types';

// The webhook URL for the n8n workflow
const N8N_WEBHOOK_URL = 'https://n8n-1-nasm.onrender.com/webhook-test/road';

export const generateRoadmap = async (topic: string, parentModule?: { id: string; title: string; description: string }): Promise<ApiResponse> => {
  try {
    const payload = parentModule 
      ? { originalTopic: topic, parentModule }
      : { topic };

    const response = await axios.post(N8N_WEBHOOK_URL, 
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: false
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return {
      roadmap: []
    };
  }
};