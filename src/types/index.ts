// Type definitions for the application

// Structure for a single roadmap module
export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
}

// Structure for the complete roadmap
export interface Roadmap {
  roadmap: RoadmapModule[];
}

// API response structure
export interface ApiResponse {
  roadmap: RoadmapModule[];
}