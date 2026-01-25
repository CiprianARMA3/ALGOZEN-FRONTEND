"use client";

import { useState } from "react";
import Menu from "./components/Menu";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Mock Data for Styling Demo
    const mockProject = {
        id: "demo-project-id",
        name: "Demo Project",
        metadata: {
            "project-icon": "https://avatar.vercel.sh/demo-project",
        },
    };

    const mockUser = {
        user_metadata: {
            full_name: "Demo User",
            avatar_url: "https://avatar.vercel.sh/demo-user",
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white">
            <Menu
                project={mockProject}
                user={mockUser}
                isCollapsed={isCollapsed}
                onToggle={() => setIsCollapsed(!isCollapsed)}
            />
            <main className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-12' : 'lg:ml-52'} ml-0 pt-20 lg:pt-16 pb-12 lg:pb-10 p-4 lg:p-6 bg-gray-50 dark:bg-[#0d0d0d] min-h-screen text-zinc-800 dark:text-zinc-300`}>
                {children}
            </main>
        </div>
    );
}
