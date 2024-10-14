"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { getLatestProjects } from "@/Actions/ProjectActions";

// type ProjectData = {
//   id: string
//   title: string
//   createdAt: string
// }

type Activity = {
  id: string;
  title: string;
  time: string;
};

export default function ActivityCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchActivities = async () => {
      const projects = await getLatestProjects();
      setActivities(
        projects.map((project) => ({
          id: project.id,
          title: `New project created: ${project.title}`,
          time: new Date(project.createdAt).toLocaleString(),
        }))
      );
      setIsLoading(false);
    };

    fetchActivities();

    // Set up an interval to periodically check for new projects
    const intervalId = setInterval(() => {
      fetchActivities();
      router.refresh(); // Trigger a refresh of the page to revalidate server components
    }, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [router]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Project Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ActivityCardSkeleton />
        ) : (
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.id} className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Briefcase className="text-blue-500" size={16} />
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </li>
            ))}
            {activities.length === 0 && (
              <li className="text-center text-muted-foreground">
                No recent project activity
              </li>
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityCardSkeleton() {
  return (
    <ul className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <li key={index} className="flex items-center">
          <Skeleton className="w-8 h-8 rounded-full mr-3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-3 w-[200px]" />
          </div>
        </li>
      ))}
    </ul>
  );
}
