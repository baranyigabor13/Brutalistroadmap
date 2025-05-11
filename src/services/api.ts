import axios from 'axios';
import { ApiResponse, Topic, RoadmapModule } from '../types';
import { createTopic, createModules, getModulesByTopicId } from './supabaseService';

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

    // Először létrehozzuk a topic-ot az adatbázisban
    const newTopic = await createTopic(topic);
    if (!newTopic) {
      throw new Error('Nem sikerült létrehozni a témát');
    }

    // Ellenőrizzük, hogy vannak-e már modulok ehhez a topic-hoz
    const existingModules = await getModulesByTopicId(newTopic.id);
    
    if (existingModules && existingModules.length > 0) {
      return {
        topic: newTopic,
        roadmap: existingModules
      };
    }

    // Ha nincsenek modulok, generáljunk újakat az n8n webhook-kal
    const response = await axios.post(N8N_WEBHOOK_URL, 
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 30000, // 30 másodperces timeout
        withCredentials: false
      }
    );

    if (!response.data || !response.data.roadmap) {
      throw new Error('Érvénytelen válasz a szervertől');
    }

    // Mentsük el a generált modulokat az adatbázisba
    const modulesToCreate = response.data.roadmap.map((module: Omit<RoadmapModule, 'id' | 'topic_id'>, index: number) => ({
      ...module,
      topic_id: newTopic.id,
      order_in_parent: index
    }));

    const savedModules = await createModules(modulesToCreate);
    if (!savedModules) {
      throw new Error('Nem sikerült menteni a modulokat');
    }

    return {
      topic: newTopic,
      roadmap: savedModules
    };
  } catch (error) {
    console.error('Hiba a roadmap generálása során:', error);
    throw error;
  }
};