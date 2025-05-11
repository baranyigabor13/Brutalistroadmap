import { supabase } from '../utils/supabaseClient';
import { Topic, RoadmapModule } from '../types';

export const createTopic = async (originalTopicText: string): Promise<Topic> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('topics')
    .insert([
      { 
        original_topic_text: originalTopicText,
        user_id: user?.id
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getTopicById = async (topicId: string): Promise<Topic> => {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('id', topicId)
    .single();

  if (error) throw error;
  return data;
};

export const getModulesByTopicId = async (topicId: string, parentModuleId: string | null = null): Promise<RoadmapModule[]> => {
  const query = supabase
    .from('modules')
    .select('id, topic_id, parent_module_id, title, description, order_in_parent, created_at')
    .eq('topic_id', topicId)
    .order('order_in_parent', { ascending: true });

  if (parentModuleId === null) {
    query.is('parent_module_id', null);
  } else {
    query.eq('parent_module_id', parentModuleId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};

export const getModuleById = async (moduleId: string): Promise<RoadmapModule> => {
  const { data, error } = await supabase
    .from('modules')
    .select('id, topic_id, parent_module_id, title, description, order_in_parent, created_at')
    .eq('id', moduleId)
    .single();

  if (error) throw error;
  return data;
};

export const createModules = async (modules: Omit<RoadmapModule, 'id'>[]): Promise<RoadmapModule[]> => {
  const { data, error } = await supabase
    .from('modules')
    .insert(modules)
    .select('id, topic_id, parent_module_id, title, description, order_in_parent, created_at');

  if (error) throw error;
  return data;
};