import axios from 'axios';
import { ApiResponse } from '../types';

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

    const response = await axios.post(N8N_WEBHOOK_URL, 
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: false,
        timeout: 30000 // 30 másodperces timeout
      }
    );

    // Ellenőrizzük, hogy van-e valid válasz és roadmap adat
    if (!response.data || !Array.isArray(response.data.roadmap)) {
      throw new Error('Érvénytelen válasz érkezett a szervertől');
    }

    return {
      roadmap: response.data.roadmap.map((module: any) => ({
        id: module.id || String(Math.random()),
        title: module.title || 'Ismeretlen modul',
        description: module.description || 'Nincs leírás'
      }))
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('A szerver nem válaszol. Kérjük, próbálja újra később.');
      }
      if (!error.response) {
        throw new Error('A szerver jelenleg nem elérhető. Kérjük, próbálja újra később.');
      }
      throw new Error(`Hiba történt: ${error.response.status} - ${error.response.statusText}`);
    }
    throw new Error('Váratlan hiba történt a roadmap generálása közben.');
  }
};