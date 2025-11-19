import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, AlertTriangle, Shield, Activity } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DetectionEvent {
  id: number;
  timestamp: string;
  type: string;
  severity: "low" | "medium" | "high";
  confidence: number;
  details: string;
}

const DetectionMonitor = () => {
  const [monitoring, setMonitoring] = useState(false);
  const [events, setEvents] = useState<DetectionEvent[]>([
    { id: 1, timestamp: "10:23:45", type: "Normal Traffic", severity: "low", confidence: 99.2, details: "Standard ECU communication" },
    { id: 2, timestamp: "10:23:52", type: "Spoofing Detected", severity: "high", confidence: 96.8, details: "Anomalous RPM signal from ECU 0x234" },
    { id: 3, timestamp: "10:24:01", type: "Normal Traffic", severity: "low", confidence: 98.5, details: "Expected throttle response" },
  ]);

  const [realtimeData, setRealtimeData] = useState([
    { time: "0s", threats: 0 },
    { time: "5s", threats: 0 },
    { time: "10s", threats: 1 },
    { time: "15s", threats: 1 },
    { time: "20s", threats: 2 },
    { time: "25s", threats: 2 },
    { time: "30s", threats: 3 },
  ]);

  const toggleMonitoring = () => {
    setMonitoring(!monitoring);
    if (!monitoring) {
      toast.success("Real-time monitoring started");
    } else {
      toast.info("Monitoring paused");
    }
  };

  useEffect(() => {
    if (!monitoring) return;

    const interval = setInterval(() => {
      // Simulate random detection events
      if (Math.random() > 0.7) {
        const attackTypes = [
          { type: "Spoofing Detected", severity: "high" as const, details: "Anomalous RPM signal detected" },
          { type: "DoS Attack", severity: "high" as const, details: "CAN bus flooding detected" },
          { type: "Replay Attack", severity: "medium" as const, details: "Suspicious message pattern" },
          { type: "Normal Traffic", severity: "low" as const, details: "Standard operation" },
        ];
        
        const attack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        const newEvent: DetectionEvent = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          type: attack.type,
          severity: attack.severity,
          confidence: 90 + Math.random() * 10,
          details: attack.details,
        };

        setEvents((prev) => [newEvent, ...prev].slice(0, 20));
        
        if (attack.severity === "high") {
          toast.error(`${attack.type} detected!`, {
            description: attack.details,
          });
        }
      }

      // Update realtime chart
      setRealtimeData((prev) => {
        const newData = [...prev.slice(1), {
          time: new Date().toLocaleTimeString(),
          threats: events.filter(e => e.severity !== "low").length,
        }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [monitoring, events]);

  const highThreatCount = events.filter(e => e.severity === "high").length;
  const mediumThreatCount = events.filter(e => e.severity === "medium").length;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Real-Time Detection Monitor
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              LSTM-based context-aware intrusion detection
            </p>
          </div>
          
          <Button 
            onClick={toggleMonitoring}
            className={monitoring ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"}
          >
            {monitoring ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Monitoring
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">System Status</p>
              {monitoring && <Activity className="w-4 h-4 text-primary animate-pulse" />}
            </div>
            <p className="text-xl font-bold text-foreground">
              {monitoring ? "Active" : "Standby"}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="text-sm text-muted-foreground mb-2">High Threats</p>
            <p className="text-xl font-bold text-destructive">{highThreatCount}</p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Medium Threats</p>
            <p className="text-xl font-bold text-warning">{mediumThreatCount}</p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Detection Rate</p>
            <p className="text-xl font-bold text-success">98.7%</p>
          </div>
        </div>
      </Card>

      {/* Threat Timeline */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Threat Detection Timeline</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={realtimeData}>
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="threats" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Detection Events Log */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Detection Events Log
        </h3>
        
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.01] ${
                event.severity === "high"
                  ? "bg-destructive/10 border-destructive/30 hover:border-destructive/50"
                  : event.severity === "medium"
                  ? "bg-warning/10 border-warning/30 hover:border-warning/50"
                  : "bg-secondary/30 border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      event.severity === "high"
                        ? "bg-destructive animate-pulse"
                        : event.severity === "medium"
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-foreground">{event.type}</p>
                    <p className="text-sm text-muted-foreground">{event.details}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={event.severity === "high" ? "destructive" : "outline"}
                    className={
                      event.severity === "medium"
                        ? "border-warning text-warning"
                        : event.severity === "low"
                        ? "border-success text-success"
                        : ""
                    }
                  >
                    {event.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-medium text-foreground">{event.confidence.toFixed(1)}%</span>
                </div>
                <Progress value={event.confidence} className="h-1" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DetectionMonitor;
