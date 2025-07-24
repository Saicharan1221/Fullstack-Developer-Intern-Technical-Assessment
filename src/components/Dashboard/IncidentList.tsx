import { useState } from 'react';
import { Incident } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getIncidentColor, getIncidentIcon } from '@/data/mockData';
import { CheckCircle, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IncidentListProps {
  incidents: Incident[];
  onResolveIncident: (incidentId: string) => void;
}

export function IncidentList({ incidents, onResolveIncident }: IncidentListProps) {
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set());

  const handleResolve = async (incidentId: string) => {
    setResolvingIds(prev => new Set([...prev, incidentId]));
    // Simulate API call
    setTimeout(() => {
      onResolveIncident(incidentId);
      setResolvingIds(prev => {
        const next = new Set(prev);
        next.delete(incidentId);
        return next;
      });
    }, 1000);
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Incidents</h3>
        <Badge variant="secondary">
          {incidents.filter(i => !i.resolved).length} Active
        </Badge>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {incidents.map((incident) => {
          const isResolving = resolvingIds.has(incident.id);
          const color = getIncidentColor(incident.type, incident.severity);
          
          return (
            <div
              key={incident.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all duration-500",
                incident.resolved ? "opacity-60 bg-muted/30" : "bg-card",
                isResolving && "opacity-50"
              )}
            >
              {/* Incident Thumbnail */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={incident.thumbnailUrl}
                  alt={`${incident.type} incident`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Incident Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{getIncidentIcon(incident.type)}</span>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs",
                      color === 'threat' && "border-threat text-threat",
                      color === 'warning' && "border-warning text-warning",
                      color === 'info' && "border-info text-info",
                      color === 'success' && "border-success text-success"
                    )}
                  >
                    {incident.severity.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="font-medium text-foreground text-sm truncate">
                  {incident.type}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {incident.camera.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(incident.tsStart)}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                {incident.resolved ? (
                  <Badge variant="outline" className="border-success text-success">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Resolved
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResolve(incident.id)}
                    disabled={isResolving}
                    className="text-xs"
                  >
                    {isResolving ? 'Resolving...' : 'Resolve'}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}