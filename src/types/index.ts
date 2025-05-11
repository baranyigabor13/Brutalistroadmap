// Type definitions for the application

export interface Topic {
  id: string;
  user_id: string;
  original_topic_text: string;
  created_at: string;
}

// Structure for a single roadmap module
export interface RoadmapModule {
  id: string;
  topic_id: string;
  parent_module_id: string | null;
  title: string;
  description: string;
  order_in_parent: number;
  created_at: string;
}

// API response structure
export interface ApiResponse {
  topic: Topic;
  roadmap: RoadmapModule[];
}

// Navigation state interface
export interface RoadmapNavigationState {
  topic: Topic;
  parentModule?: RoadmapModule;
}