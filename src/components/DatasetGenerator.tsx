import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Download, Play, RefreshCw, FileText } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DatasetGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recordCount, setRecordCount] = useState("10000");
  const [attackRatio, setAttackRatio] = useState("20");
  const [datasetGenerated, setDatasetGenerated] = useState(false);

  const generateDataset = () => {
    setGenerating(true);
    setProgress(0);
    toast.info("Starting dataset generation...");

    // Simulate dataset generation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setDatasetGenerated(true);
          toast.success("Dataset generated successfully!");
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const downloadDataset = () => {
    toast.success("Downloading dataset...");
  };

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">Dataset Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="records">Number of Records</Label>
            <Input
              id="records"
              type="number"
              value={recordCount}
              onChange={(e) => setRecordCount(e.target.value)}
              className="bg-secondary border-border"
              min="1000"
              max="100000"
            />
            <p className="text-xs text-muted-foreground">Recommended: 10,000 - 50,000 records</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratio">Attack Ratio (%)</Label>
            <Input
              id="ratio"
              type="number"
              value={attackRatio}
              onChange={(e) => setAttackRatio(e.target.value)}
              className="bg-secondary border-border"
              min="10"
              max="50"
            />
            <p className="text-xs text-muted-foreground">Percentage of attack samples (10% - 50%)</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button 
            onClick={generateDataset} 
            disabled={generating}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Generate Dataset
              </>
            )}
          </Button>
          
          {datasetGenerated && (
            <Button 
              onClick={downloadDataset}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
          )}
        </div>

        {generating && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Generating vehicle telemetry data...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </Card>

      {/* Feature Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Signal Features
          </h3>
          <div className="space-y-3">
            {[
              { name: "Speed", range: "0 - 200 km/h", unit: "km/h" },
              { name: "Throttle Position", range: "0 - 100%", unit: "%" },
              { name: "Brake Status", range: "0 - 100%", unit: "%" },
              { name: "Engine RPM", range: "600 - 7000", unit: "RPM" },
              { name: "Gear Position", range: "0 - 6", unit: "Gear" },
              { name: "Steering Angle", range: "-540 to 540", unit: "degrees" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{feature.name}</p>
                  <p className="text-xs text-muted-foreground">{feature.range}</p>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {feature.unit}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-destructive" />
            Attack Types
          </h3>
          <div className="space-y-3">
            {[
              { name: "Normal Traffic", color: "success", desc: "Baseline vehicle behavior" },
              { name: "DoS Attack", color: "destructive", desc: "CAN bus flooding" },
              { name: "Spoofing Attack", color: "destructive", desc: "ECU impersonation" },
              { name: "Replay Attack", color: "warning", desc: "Message replay" },
              { name: "Fuzzing Attack", color: "destructive", desc: "Random data injection" },
            ].map((attack, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-all duration-200">
                <div>
                  <p className="text-sm font-medium text-foreground">{attack.name}</p>
                  <p className="text-xs text-muted-foreground">{attack.desc}</p>
                </div>
                <div className={`w-3 h-3 rounded-full bg-${attack.color} ${attack.color === 'destructive' ? 'animate-pulse' : ''}`} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Dataset Preview */}
      {datasetGenerated && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Dataset Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">Timestamp</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Speed</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Throttle</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Brake</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">RPM</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Gear</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Label</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: "0.00", speed: 0, throttle: 0, brake: 100, rpm: 800, gear: 0, label: "Normal" },
                  { time: "0.05", speed: 15, throttle: 30, brake: 0, rpm: 1200, gear: 1, label: "Normal" },
                  { time: "0.10", speed: 45, throttle: 60, brake: 0, rpm: 2500, gear: 2, label: "Normal" },
                  { time: "0.15", speed: 45, throttle: 60, brake: 0, rpm: 6500, gear: 2, label: "Spoofing" },
                  { time: "0.20", speed: 80, throttle: 80, brake: 0, rpm: 3500, gear: 4, label: "Normal" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="p-3 text-foreground">{row.time}s</td>
                    <td className="p-3 text-foreground">{row.speed} km/h</td>
                    <td className="p-3 text-foreground">{row.throttle}%</td>
                    <td className="p-3 text-foreground">{row.brake}%</td>
                    <td className="p-3 text-foreground">{row.rpm}</td>
                    <td className="p-3 text-foreground">{row.gear}</td>
                    <td className="p-3">
                      <Badge 
                        variant={row.label === "Normal" ? "outline" : "destructive"}
                        className={row.label === "Normal" ? "border-success text-success" : ""}
                      >
                        {row.label}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DatasetGenerator;
