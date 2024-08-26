import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type WelcomePageProps = {
  onSelectMode: (mode: '1v1' | '1vbot') => void;
};

const WelcomePage: React.FC<WelcomePageProps> = ({ onSelectMode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome to 1D Chess</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button onClick={() => onSelectMode('1v1')} variant="outline" size="lg">
            Play 1v1
          </Button>
          <Button onClick={() => onSelectMode('1vbot')} variant="outline" size="lg">
            Play vs Bot
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomePage;