import { Camera } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';

interface CameraFeedProps {
  camera: Camera;
  timestamp?: Date;
  isMain?: boolean;
}

export function CameraFeed({ camera, timestamp = new Date(), isMain = false }: CameraFeedProps) {
  return (
    <Card className={`relative overflow-hidden ${isMain ? 'h-96' : 'h-32'}`}>
      <img 
        src={camera.imageUrl} 
        alt={`${camera.name} feed`}
        className="w-full h-full object-cover"
      />
      
      {/* Overlay with camera info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30">
        {/* Top overlay */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            LIVE
          </Badge>
          
          {isMain && (
            <Badge variant="outline" className="bg-black/50 text-white border-white/20">
              Camera - {camera.id.split('-')[1]}
            </Badge>
          )}
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="font-medium">{camera.name}</p>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <MapPin className="w-3 h-3" />
                {camera.location}
              </div>
            </div>
            
            <div className="text-right text-sm">
              <div className="flex items-center gap-1 opacity-90">
                <Clock className="w-3 h-3" />
                {timestamp.toLocaleTimeString()}
              </div>
              <p className="opacity-75">{timestamp.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}