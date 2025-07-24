import { Camera, Incident } from '@/types';
import cameraEntrance from '@/assets/camera-entrance.jpg';
import cameraShopfloor from '@/assets/camera-shopfloor.jpg';
import cameraVault from '@/assets/camera-vault.jpg';
import incident1 from '@/assets/incident-1.jpg';
import incident2 from '@/assets/incident-2.jpg';
import incident3 from '@/assets/incident-3.jpg';

export const cameras: Camera[] = [
  {
    id: 'cam-001',
    name: 'Entrance',
    location: 'Main Building Entrance',
    imageUrl: cameraEntrance,
  },
  {
    id: 'cam-002',
    name: 'Shop Floor A',
    location: 'Manufacturing Area A',
    imageUrl: cameraShopfloor,
  },
  {
    id: 'cam-003',
    name: 'Vault',
    location: 'Secure Storage Area',
    imageUrl: cameraVault,
  },
];

const now = new Date();
const getTimeAgo = (minutes: number) => new Date(now.getTime() - minutes * 60000);

export const incidents: Incident[] = [
  {
    id: 'inc-001',
    cameraId: 'cam-001',
    camera: cameras[0],
    type: 'Unauthorized Access',
    tsStart: getTimeAgo(15),
    tsEnd: null,
    thumbnailUrl: incident1,
    resolved: false,
    severity: 'high',
  },
  {
    id: 'inc-002',
    cameraId: 'cam-002',
    camera: cameras[1],
    type: 'Gun Threat',
    tsStart: getTimeAgo(45),
    tsEnd: null,
    thumbnailUrl: incident2,
    resolved: false,
    severity: 'critical',
  },
  {
    id: 'inc-003',
    cameraId: 'cam-003',
    camera: cameras[2],
    type: 'Face Recognised',
    tsStart: getTimeAgo(120),
    tsEnd: getTimeAgo(118),
    thumbnailUrl: incident3,
    resolved: true,
    severity: 'low',
  },
  {
    id: 'inc-004',
    cameraId: 'cam-001',
    camera: cameras[0],
    type: 'Motion Detection',
    tsStart: getTimeAgo(180),
    tsEnd: getTimeAgo(175),
    thumbnailUrl: incident1,
    resolved: true,
    severity: 'low',
  },
  {
    id: 'inc-005',
    cameraId: 'cam-002',
    camera: cameras[1],
    type: 'Perimeter Breach',
    tsStart: getTimeAgo(240),
    tsEnd: null,
    thumbnailUrl: incident2,
    resolved: false,
    severity: 'medium',
  },
  {
    id: 'inc-006',
    cameraId: 'cam-003',
    camera: cameras[2],
    type: 'Loitering',
    tsStart: getTimeAgo(300),
    tsEnd: getTimeAgo(290),
    thumbnailUrl: incident3,
    resolved: true,
    severity: 'low',
  },
  {
    id: 'inc-007',
    cameraId: 'cam-001',
    camera: cameras[0],
    type: 'Suspicious Activity',
    tsStart: getTimeAgo(360),
    tsEnd: null,
    thumbnailUrl: incident1,
    resolved: false,
    severity: 'medium',
  },
  {
    id: 'inc-008',
    cameraId: 'cam-002',
    camera: cameras[1],
    type: 'Equipment Tampering',
    tsStart: getTimeAgo(420),
    tsEnd: getTimeAgo(415),
    thumbnailUrl: incident2,
    resolved: true,
    severity: 'high',
  },
];

export const getIncidentColor = (type: string, severity: string) => {
  if (severity === 'critical') return 'threat';
  if (severity === 'high') return 'warning';
  if (severity === 'medium') return 'info';
  return 'success';
};

export const getIncidentIcon = (type: string) => {
  const iconMap: Record<string, string> = {
    'Gun Threat': '🔫',
    'Unauthorized Access': '🚫',
    'Face Recognised': '👤',
    'Motion Detection': '📱',
    'Perimeter Breach': '🚨',
    'Loitering': '⏰',
    'Suspicious Activity': '⚠️',
    'Equipment Tampering': '🔧',
  };
  return iconMap[type] || '📹';
};