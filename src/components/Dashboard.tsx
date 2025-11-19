import { Card } from "@/components/ui/card";
import { Activity, Shield, Database, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const mockData = [
  { time: "00:00", speed: 0, rpm: 800, throttle: 0 },
  { time: "00:05", speed: 20, rpm: 1200, throttle: 25 },
  { time: "00:10", speed: 45, rpm: 2000, throttle: 50 },
  { time: "00:15", speed: 60, rpm: 2500, throttle: 60 },
  { time: "00:20", speed: 80, rpm: 3000, throttle: 75 },
  { time: "00:25", speed: 90, rpm: 3200, throttle: 80 },
  { time: "00:30", speed: 85, rpm: 3000, throttle: 70 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Threats Detected</p>
              <p className="text-3xl font-bold text-foreground mt-2">127</p>
              <p className="text-xs text-success mt-1">↓ 12% from last week</p>
            </div>
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <Shield className="w-6 h-6 text-destructive" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Detection Accuracy</p>
              <p className="text-3xl font-bold text-foreground mt-2">98.7%</p>
              <p className="text-xs text-success mt-1">↑ 2.3% improvement</p>
            </div>
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Dataset Size</p>
              <p className="text-3xl font-bold text-foreground mt-2">50K</p>
              <p className="text-xs text-muted-foreground mt-1">Records processed</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <Database className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">System Status</p>
              <p className="text-3xl font-bold text-foreground mt-2">Active</p>
              <p className="text-xs text-success mt-1">All ECUs online</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <Activity className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Speed (km/h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockData}>
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
                dataKey="speed" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Engine RPM</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockData}>
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
                dataKey="rpm" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Throttle Position (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockData}>
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
                dataKey="throttle" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {[
              { type: "Spoofing Attempt", severity: "high", time: "2 min ago" },
              { type: "Anomalous RPM", severity: "medium", time: "15 min ago" },
              { type: "DoS Attack", severity: "high", time: "1 hour ago" },
              { type: "Normal Traffic", severity: "low", time: "2 hours ago" },
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === "high" ? "bg-destructive animate-pulse" : 
                    alert.severity === "medium" ? "bg-warning" : 
                    "bg-success"
                  }`} />
                  <span className="text-sm font-medium text-foreground">{alert.type}</span>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
