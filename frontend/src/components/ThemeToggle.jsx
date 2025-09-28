import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // avoid hydration mismatch
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? (
                            <Sun className="h-[1.2rem] w-[1.2rem]" />
                        ) : (
                            <Moon className="h-[1.2rem] w-[1.2rem]" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="px-2 py-1 rounded-md">
                    <p>{theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
