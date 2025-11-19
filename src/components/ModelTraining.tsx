import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, StopCircle, Save, Brain } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const trainingData = [
  { epoch: 1, trainLoss: 0.45, valLoss: 0.42, accuracy: 85 },
  { epoch: 2, trainLoss: 0.35, valLoss: 0.33, accuracy: 89 },
  { epoch: 3, trainLoss: 0.28, valLoss: 0.27, accuracy: 92 },
  { epoch: 4, trainLoss: 0.22, valLoss: 0.21, accuracy: 94 },
  { epoch: 5, trainLoss: 0.18, valLoss: 0.19, accuracy: 96 },
  { epoch: 6, trainLoss: 0.15, valLoss: 0.17, accuracy: 97 },
  { epoch: 7, trainLoss: 0.12, valLoss: 0.15, accuracy: 98 },
  { epoch: 8, trainLoss: 0.10, valLoss: 0.13, accuracy: 98.5 },
];

const ModelTraining = () => {
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [epochs, setEpochs] = useState("50");
  const [batchSize, setBatchSize] = useState("32");
  const [learningRate, setLearningRate] = useState("0.001");

  const startTraining = () => {
    setTraining(true);
    setProgress(0);
    setCurrentEpoch(0);
    toast.info("Starting LSTM model training...");

    // Simulate training
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        setCurrentEpoch(Math.floor((newProgress / 100) * parseInt(epochs)));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTraining(false);
          toast.success("Model training completed successfully!");
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const stopTraining = () => {
    setTraining(false);
    toast.warning("Training stopped by user");
  };

  const saveModel = () => {
    toast.success("Model saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Model Architecture */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          LSTM Model Architecture
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <h3 className="font-semibold text-foreground mb-3">Model Layers</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">Input Layer</span>
                <Badge variant="outline" className="border-primary/30">6 features × 10 timesteps</Badge>
              </div>
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">LSTM Layer 1</span>
                <Badge variant="outline" className="border-primary/30">128 units, return_sequences=True</Badge>
              </div>
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">Dropout</span>
                <Badge variant="outline" className="border-primary/30">0.3</Badge>
              </div>
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">LSTM Layer 2</span>
                <Badge variant="outline" className="border-primary/30">64 units</Badge>
              </div>
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">Dropout</span>
                <Badge variant="outline" className="border-primary/30">0.3</Badge>
              </div>
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">Dense Layer</span>
                <Badge variant="outline" className="border-primary/30">32 units, ReLU</Badge>
              </div>
              <div className="flex justify-between p-2 bg-card/50 rounded">
                <span className="text-muted-foreground">Output Layer</span>
                <Badge variant="outline" className="border-success/30">5 classes, Softmax</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-secondary/30 border border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">Total Parameters</p>
              <p className="text-2xl font-bold text-primary">187,653</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">Trainable Params</p>
              <p className="text-2xl font-bold text-primary">187,653</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">Model Size</p>
              <p className="text-2xl font-bold text-primary">2.94 MB</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Training Configuration */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Training Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="epochs">Epochs</Label>
            <Input
              id="epochs"
              type="number"
              value={epochs}
              onChange={(e) => setEpochs(e.target.value)}
              className="bg-secondary border-border"
              disabled={training}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch">Batch Size</Label>
            <Input
              id="batch"
              type="number"
              value={batchSize}
              onChange={(e) => setBatchSize(e.target.value)}
              className="bg-secondary border-border"
              disabled={training}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lr">Learning Rate</Label>
            <Input
              id="lr"
              type="number"
              value={learningRate}
              onChange={(e) => setLearningRate(e.target.value)}
              className="bg-secondary border-border"
              step="0.0001"
              disabled={training}
            />
          </div>
        </div>

        <div className="flex gap-3">
          {!training ? (
            <Button 
              onClick={startTraining}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Training
            </Button>
          ) : (
            <Button 
              onClick={stopTraining}
              variant="destructive"
            >
              <StopCircle className="w-4 h-4 mr-2" />
              Stop Training
            </Button>
          )}
          
          <Button 
            onClick={saveModel}
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
            disabled={progress === 0}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Model
          </Button>
        </div>

        {training && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Epoch {currentEpoch} / {epochs}</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Loss</p>
                <p className="text-lg font-bold text-foreground">0.123</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                <p className="text-lg font-bold text-success">97.8%</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Val Loss</p>
                <p className="text-lg font-bold text-foreground">0.145</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Training Metrics */}
      {progress > 0 && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Training Metrics</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Loss Over Epochs</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trainingData}>
                  <XAxis 
                    dataKey="epoch" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="trainLoss" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Training Loss"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="valLoss" 
                    stroke="hsl(var(--chart-4))" 
                    strokeWidth={2}
                    name="Validation Loss"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Accuracy Over Epochs</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trainingData}>
                  <XAxis 
                    dataKey="epoch" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[80, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    name="Accuracy %"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ModelTraining;
