import { Shield, Settings, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-border bg-card">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
          <Shield className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">SecureWatch</h1>
          <p className="text-sm text-muted-foreground">CCTV Monitoring System</p>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="sm">
          Dashboard
        </Button>
        <Button variant="ghost" size="sm">
          Cameras
        </Button>
        <Button variant="ghost" size="sm">
          Incidents
        </Button>
        <Button variant="ghost" size="sm">
          Reports
        </Button>
      </div>

      {/* User Info and Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">Security Admin</p>
            <p className="text-muted-foreground">Online</p>
          </div>
        </div>
      </div>
    </nav>
  );
}