export interface Camera {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
}

export interface Incident {
  id: string;
  cameraId: string;
  camera: Camera;
  type: string;
  tsStart: Date;
  tsEnd: Date | null;
  thumbnailUrl: string;
  resolved: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  cameraId: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}