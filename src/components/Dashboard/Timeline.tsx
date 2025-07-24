import { useState, useRef, useEffect } from 'react';
import { Camera, Incident } from '@/types';
import { Card } from '@/components/ui/card';
import { getIncidentColor } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface TimelineProps {
  cameras: Camera[];
  incidents: Incident[];
  currentTime: Date;
  onTimeChange: (time: Date) => void;
}

export function Timeline({ cameras, incidents, currentTime, onTimeChange }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Generate 24 hour marks
  const hours = Array.from({ length: 25 }, (_, i) => i);
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const getTimeFromPosition = (x: number, width: number) => {
    const percentage = x / width;
    const millisInDay = 24 * 60 * 60 * 1000;
    return new Date(startOfDay.getTime() + percentage * millisInDay);
  };

  const getPositionFromTime = (time: Date, width: number) => {
    const dayStart = new Date(time);
    dayStart.setHours(0, 0, 0, 0);
    const millisSinceStart = time.getTime() - dayStart.getTime();
    const millisInDay = 24 * 60 * 60 * 1000;
    return (millisSinceStart / millisInDay) * width;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging && e.type !== 'mousedown') return;
    
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newTime = getTimeFromPosition(x, rect.width);
      onTimeChange(newTime);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">24-Hour Timeline</h3>
      
      <div className="space-y-4">
        {/* Time ruler */}
        <div className="relative h-12 border-b border-border">
          <div className="flex justify-between items-end h-full text-xs text-muted-foreground">
            {hours.map((hour) => (
              <div key={hour} className="flex flex-col items-center">
                <div className="w-px h-3 bg-border mb-1" />
                <span>{hour.toString().padStart(2, '0')}:00</span>
              </div>
            ))}
          </div>
        </div>

        {/* Camera timeline rows */}
        <div className="space-y-3">
          {cameras.map((camera) => {
            const cameraIncidents = incidents.filter(i => i.cameraId === camera.id);
            
            return (
              <div key={camera.id} className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-foreground">{camera.name}</span>
                </div>
                
                <div
                  ref={camera.id === cameras[0].id ? timelineRef : undefined}
                  className="relative h-8 bg-muted rounded cursor-pointer"
                  onMouseDown={handleMouseDown}
                >
                  {/* Incident markers */}
                  {cameraIncidents.map((incident) => {
                    const position = getPositionFromTime(incident.tsStart, 100);
                    const color = getIncidentColor(incident.type, incident.severity);
                    
                    return (
                      <div
                        key={incident.id}
                        className={cn(
                          "absolute top-1 w-2 h-6 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110",
                          color === 'threat' && "bg-threat",
                          color === 'warning' && "bg-warning",
                          color === 'info' && "bg-info",
                          color === 'success' && "bg-success",
                          incident.resolved && "opacity-50"
                        )}
                        style={{ left: `${position}%` }}
                        title={`${incident.type} - ${incident.tsStart.toLocaleTimeString()}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current time scrubber */}
        <div className="relative">
          <div
            className="absolute top-0 w-0.5 h-full bg-primary z-10 pointer-events-none"
            style={{
              left: `${getPositionFromTime(currentTime, 100)}%`,
              height: `${cameras.length * 44 + 48}px`,
              transform: 'translateY(-100%)'
            }}
          >
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full border-2 border-background" />
          </div>
        </div>
      </div>

      {/* Current time display */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Current Time: <span className="font-mono text-foreground">{currentTime.toLocaleTimeString()}</span>
        </p>
      </div>
    </Card>
  );
}