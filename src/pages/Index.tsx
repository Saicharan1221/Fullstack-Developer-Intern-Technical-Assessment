import { useState } from 'react';
import { Navbar } from '@/components/Dashboard/Navbar';
import { CameraFeed } from '@/components/Dashboard/CameraFeed';
import { IncidentList } from '@/components/Dashboard/IncidentList';
import { Timeline } from '@/components/Dashboard/Timeline';
import { cameras, incidents as initialIncidents } from '@/data/mockData';
import { Incident } from '@/types';

const Index = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedCamera] = useState(cameras[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCameraThumbnails] = useState([cameras[1], cameras[2]]);

  const handleResolveIncident = (incidentId: string) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId 
          ? { ...incident, resolved: true, tsEnd: new Date() }
          : incident
      )
    );
  };

  const handleTimeChange = (time: Date) => {
    setCurrentTime(time);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="p-6 space-y-6">
        {/* Top Half - Main Monitoring Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
          {/* Left Column - Main Camera Feed and Thumbnails */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Camera Feed */}
            <CameraFeed 
              camera={selectedCamera} 
              timestamp={currentTime}
              isMain 
            />
            
            {/* Camera Thumbnails */}
            <div className="grid grid-cols-2 gap-4">
              {selectedCameraThumbnails.map((camera) => (
                <CameraFeed 
                  key={camera.id}
                  camera={camera} 
                  timestamp={currentTime}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Incident List */}
          <div className="lg:col-span-1">
            <IncidentList 
              incidents={incidents}
              onResolveIncident={handleResolveIncident}
            />
          </div>
        </div>

        {/* Bottom Half - Timeline */}
        <Timeline 
          cameras={cameras}
          incidents={incidents}
          currentTime={currentTime}
          onTimeChange={handleTimeChange}
        />
      </div>
    </div>
  );
};

export default Index;
