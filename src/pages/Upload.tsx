
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, FileVideo, CheckCircle, AlertOctagon, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface Athlete {
  id: string;
  name: string;
  sport: string;
  image: string;
}

const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedAthlete, setSelectedAthlete] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Define sports with vibrant colors
  const sports: Sport[] = [
    { id: "basketball", name: "Basketball", icon: "🏀", color: "text-orange-600", bgColor: "bg-orange-100" },
    { id: "tennis", name: "Tennis", icon: "🎾", color: "text-green-600", bgColor: "bg-green-100" },
    { id: "running", name: "Running", icon: "🏃", color: "text-blue-600", bgColor: "bg-blue-100" },
    { id: "soccer", name: "Soccer", icon: "⚽", color: "text-emerald-600", bgColor: "bg-emerald-100" },
    { id: "golf", name: "Golf", icon: "🏌️", color: "text-purple-600", bgColor: "bg-purple-100" },
    { id: "swimming", name: "Swimming", icon: "🏊", color: "text-cyan-600", bgColor: "bg-cyan-100" },
  ];

  // Define athletes based on selected sport
  const getAthletes = (sportId: string): Athlete[] => {
    switch (sportId) {
      case "basketball":
        return [
          { id: "lebron", name: "LeBron James", sport: "basketball", image: "https://images.unsplash.com/photo-1630496634852-89fb0b8496f9?q=80&w=200&auto=format&fit=crop" },
          { id: "curry", name: "Stephen Curry", sport: "basketball", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=200&auto=format&fit=crop" },
        ];
      case "tennis":
        return [
          { id: "federer", name: "Roger Federer", sport: "tennis", image: "https://images.unsplash.com/photo-1595435934813-e7b8ea348431?q=80&w=200&auto=format&fit=crop" },
          { id: "serena", name: "Serena Williams", sport: "tennis", image: "https://images.unsplash.com/photo-1599386732357-e4d72fcae2c4?q=80&w=200&auto=format&fit=crop" },
        ];
      default:
        return [];
    }
  };

  const athletes = selectedSport ? getAthletes(selectedSport) : [];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Check if it's a video file
    if (!file.type.includes('video/')) {
      toast.error("Invalid file type", {
        description: "Please upload a video file (MP4, MOV, etc.)"
      });
      return;
    }

    setSelectedFile(file);
    
    // Create a preview thumbnail (simplified for this example)
    try {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } catch (err) {
      console.error("Error creating preview:", err);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    if (!selectedFile || !selectedSport || !selectedAthlete) {
      toast.error("Missing information", {
        description: "Please select a sport, athlete, and upload a video."
      });
      return;
    }

    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      toast.success("Upload successful", {
        description: "Your video has been uploaded and is being analyzed."
      });
      navigate(`/analysis?sport=${selectedSport}&athlete=${selectedAthlete}`);
    }, 2000);
  };

  const getSelectedSportColor = () => {
    const sport = sports.find(s => s.id === selectedSport);
    return sport?.color || "text-primary";
  };

  const getSelectedSportBgColor = () => {
    const sport = sports.find(s => s.id === selectedSport);
    return sport?.bgColor || "bg-muted";
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Upload Your Performance
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload a video of yourself performing sports to compare with professionals and receive AI-powered feedback
        </p>
      </div>

      {/* Sport Selection */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold mr-2">1</span>
          Select Your Sport
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {sports.map((sport) => (
            <Card 
              key={sport.id} 
              className={cn(
                "border cursor-pointer transition-all duration-300 overflow-hidden",
                selectedSport === sport.id 
                  ? `border-2 border-${sport.color.split('-')[1]}-500 shadow-md` 
                  : "hover:shadow-md"
              )}
              onClick={() => {
                setSelectedSport(sport.id);
                setSelectedAthlete("");
              }}
            >
              <CardContent className={cn(
                "p-6 flex flex-col items-center justify-center text-center",
                selectedSport === sport.id ? sport.bgColor : ""
              )}>
                <span className="text-4xl mb-2">{sport.icon}</span>
                <h3 className={cn(
                  "font-medium",
                  selectedSport === sport.id ? sport.color : ""
                )}>
                  {sport.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Athlete Selection - Only show if sport is selected */}
      {selectedSport && (
        <div className="mb-10 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold mr-2">2</span>
            Select Professional Athlete
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {athletes.map((athlete) => (
              <Card 
                key={athlete.id} 
                className={cn(
                  "border cursor-pointer transition-all duration-300 overflow-hidden",
                  selectedAthlete === athlete.id 
                    ? `border-2 border-${getSelectedSportColor().split('-')[1]}-500 shadow-md` 
                    : "hover:shadow-md"
                )}
                onClick={() => setSelectedAthlete(athlete.id)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={athlete.image} 
                      alt={athlete.name}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-300",
                        selectedAthlete === athlete.id ? "scale-105" : "hover:scale-105"
                      )}
                    />
                  </div>
                  <div className={cn(
                    "p-3 text-center",
                    selectedAthlete === athlete.id ? getSelectedSportBgColor() : ""
                  )}>
                    <h3 className={cn(
                      "font-medium",
                      selectedAthlete === athlete.id ? getSelectedSportColor() : ""
                    )}>
                      {athlete.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Video Upload - Only show if sport and athlete are selected */}
      {selectedSport && selectedAthlete && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold mr-2">3</span>
            Upload Your Video
          </h2>

          {!selectedFile ? (
            <div 
              className={cn(
                "border-2 border-dashed rounded-lg p-8 transition-all duration-300 text-center",
                dragActive 
                  ? `${getSelectedSportBgColor()} border-${getSelectedSportColor().split('-')[1]}-500` 
                  : "hover:border-primary"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center py-4">
                <div className={cn(
                  "mb-4 rounded-full p-4",
                  getSelectedSportBgColor()
                )}>
                  <Upload className={cn("h-8 w-8", getSelectedSportColor())} />
                </div>
                <h3 className="text-lg font-medium mb-2">Drag & Drop Your Video</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Upload an MP4 or MOV file of yourself performing the selected sport
                </p>
                <label htmlFor="video-upload">
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button 
                    className={cn(
                      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    )}
                  >
                    Browse Files
                  </Button>
                </label>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-6 bg-card">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute -top-2 -right-2 rounded-full bg-card shadow-md hover:bg-destructive hover:text-destructive-foreground"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileVideo className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedFile.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <div className="flex items-center mt-2 text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Ready to upload</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleSubmit}
              disabled={!selectedFile || uploading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg h-auto"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Start Analysis"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="fixed top-20 right-0 -z-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      <div className="fixed bottom-20 left-0 -z-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
    </div>
  );
};

export default Upload;
