'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { FaGithub, FaMoon, FaSun } from 'react-icons/fa';

const WelcomePage = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleSelectMode = (mode: '1v1' | '1vbot') => {
    router.push(`/game?mode=${mode}`);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome to 1D Chess</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button onClick={() => handleSelectMode('1v1')} variant="outline" size="lg">
            Play 1v1
          </Button>
          <Button onClick={() => handleSelectMode('1vbot')} variant="outline" size="lg">
            Play vs Bot
          </Button>
          <div className="flex justify-between mt-4">
            <Button onClick={toggleTheme} variant="outline" size="icon">
              {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            {/* I NEED TO FIX THIS BUTTON FOR SOURCE CODE */}
            <a 
              href="https://github.com/AndrxwWxng/gpa-calculator" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <FaGithub className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomePage;