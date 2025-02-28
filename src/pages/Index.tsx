
import { Link } from "react-router-dom";
import { ArrowRight, Upload, Play, LineChart, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const features = [
    {
      title: "Upload Your Video",
      description: "Upload videos of yourself performing a sports activity.",
      icon: <Upload className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Compare with Pros",
      description: "See your movements compared with professional athletes.",
      icon: <Play className="h-6 w-6" />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Get Analysis",
      description: "Receive personalized feedback on your technique.",
      icon: <LineChart className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Track Progress",
      description: "Monitor your improvement over time.",
      icon: <History className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const sports = [
    { name: "Basketball", icon: "🏀" },
    { name: "Tennis", icon: "🎾" },
    { name: "Running", icon: "🏃" },
    { name: "Soccer", icon: "⚽" },
    { name: "Golf", icon: "🏌️" },
    { name: "Swimming", icon: "🏊" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                MotionMaster
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Perfect your sports technique by comparing your movements with professional athletes
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/upload">
                <Button className="px-8">
                  Start Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our AI-powered platform provides detailed feedback to improve your sports performance
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="bg-gray-50 dark:bg-slate-900 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Supported Sports</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Analyze your technique across multiple sports
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-6">
            {sports.map((sport, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-4xl mb-2">{sport.icon}</div>
                  <h3 className="font-medium">{sport.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Improve?</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Upload your videos and get personalized feedback from our AI
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/upload">
                <Button className="px-8" size="lg">
                  Upload Video
                  <Upload className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-slate-900">
        <div className="container flex flex-col gap-6 py-8 md:py-12 px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium">MotionMaster</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Perfect your technique with AI feedback</p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button variant="ghost" size="sm">Terms</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} MotionMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
