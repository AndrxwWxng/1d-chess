'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-purple-600 dark:from-blue-800 dark:to-purple-900 p-4 transition-colors duration-200">
      <Card className="w-full max-w-md shadow-xl bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Welcome to 1D Chess</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => handleSelectMode('1v1')} variant="outline" size="lg" className="w-full bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Play 1v1
          </Button>
          <Button onClick={() => handleSelectMode('1vbot')} variant="outline" size="lg" className="w-full bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Play vs Bot
          </Button>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={toggleTheme} variant="ghost" size="icon" className="rounded-full text-gray-800 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {/* I NEED TO FIX THIS BUTTON FOR SOURCE CODE */}
            <a 
              href="https://github.com/AndrxwWxng/gpa-calculator" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="rounded-full text-gray-800 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                <FaGithub className="h-5 w-5" />
              </Button>
            </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomePage;