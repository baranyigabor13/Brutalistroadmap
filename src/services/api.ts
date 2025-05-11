import axios from 'axios';
import { ApiResponse } from '../types';
import { createTopic, createModules, getModulesByTopicId } from './supabaseService';

// The webhook URL for the n8n workflow
const N8N_WEBHOOK_URL = 'https://n8n-1-nasm.onrender.com/webhook-test/road';

export const generateRoadmap = async (topicText: string, moduleId?: string): Promise<ApiResponse> => {
  try {
    // Ha van moduleId, először próbáljuk meg betölteni a meglévő almodulokat
    if (moduleId) {
      const existingModules = await getModulesByTopicId(moduleId);
      if (existingModules.length > 0) {
        return {
          topic: await getTopicById(existingModules[0].topic_id),
          roadmap: existingModules
        };
      }
    }

    // Ha nincs moduleId vagy nincsenek meglévő modulok, generáljunk újakat
    const payload = moduleId 
      ? { 
          topic: topicText,
          parent_module_id: moduleId
        }
      : { topic: topicText };

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

    // Mentsük az adatokat Supabase-be
    const topic = await createTopic(topicText);
    const modules = await createModules(
      response.data.roadmap.map((module: any, index: number) => ({
        ...module,
        topic_id: topic.id,
        parent_module_id: moduleId || null,
        order_in_parent: index
      }))
    );

    return {
      topic,
      roadmap: modules
    };
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw error;
  }
};