import axios from 'axios';
import { ApiResponse } from '../types';
import { supabase } from '../utils/supabaseClient';

// The webhook URL for the n8n workflow
const N8N_WEBHOOK_URL = 'https://n8n-1-nasm.onrender.com/webhook-test/road';

export const generateRoadmap = async (topic: string, moduleTitle?: string): Promise<ApiResponse> => {
  try {
    const payload = moduleTitle 
      ? { 
          topic,
          title_to_expand: moduleTitle
        }
      : { topic };

    // Először próbáljuk meg lekérni a meglévő modulokat
    const { data: existingModules, error } = await supabase
      .from('modules')
      .select('id, title, description, topic_id, parent_module_id, order_in_parent')
      .order('order_in_parent', { ascending: true });

    if (error) {
      throw error;
    }

    if (existingModules && existingModules.length > 0) {
      return { roadmap: existingModules };
    }

    // Ha nincsenek meglévő modulok, generáljunk újakat az n8n webhook-kal
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
    throw error;
  }
};