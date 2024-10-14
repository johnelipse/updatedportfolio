// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Layers, Newspaper, Users } from "lucide-react";
// import { fetchArticles } from "@/actions/articleActions";
// import { fetchSubscribers } from "@/actions/subscriberActions";
// import { getAllCats } from "@/actions/catActions";
// import { fetchProjects } from "@/Actions/ProjectActions";

// export default async function DashboardCards() {
//   const projectsCreated = await fetchProjects();
//   const countedProjects = projectsCreated?.length;

//   const subsCreated = await fetchSubscribers();
//   const countedSubscribers = subsCreated?.length;

//   const allCats = await getAllCats();
//   const countedCats = allCats?.length;

// Calculate the number of articles created in the last 30 days
//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//   const recentProjects =
//     projectsCreated?.filter(
//       (article) => new Date(article.createdAt) > thirtyDaysAgo
//     ).length || 0;

//   // Calculate the number of subscribers gained in the last 24 hours
//   const twentyFourHoursAgo = new Date();
//   twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
//   const recentSubscribers =
//     subsCreated?.filter((sub) => new Date(sub.createdAt) > twentyFourHoursAgo)
//       .length || 0;

//   return (
//     <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
//       <Card x-chunk="dashboard-01-chunk-0">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Number of Articles
//           </CardTitle>
//           <Newspaper className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{countedProjects}</div>
//           <p className="text-xs text-muted-foreground">
//             Articles created till date
//           </p>
//         </CardContent>
//       </Card>

//       <Card x-chunk="dashboard-01-chunk-1">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Recent Projects</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{recentProjects}</div>
//           <p className="text-xs text-muted-foreground">
//             Projects for the last 30 days
//           </p>
//         </CardContent>
//       </Card>

//       <Card x-chunk="dashboard-01-chunk-2">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Categories</CardTitle>
//           <Layers className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{countedCats}</div>
//           <p className="text-xs text-muted-foreground">
//             All categories till date
//           </p>
//         </CardContent>
//       </Card>

//       <Card x-chunk="dashboard-01-chunk-3">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">New Subscribers</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{recentSubscribers}</div>
//           <p className="text-xs text-muted-foreground">
//             Subscribers in last 24 hours
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );

// "use client";

// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Briefcase, Code, Eye, Star, Zap } from "lucide-react";
// import { Progress } from "@/components/ui/progress";
// import { useQuery } from "@tanstack/react-query";
// import { Skeleton } from "@/components/ui/skeleton";
// import { fetchProjects } from "@/Actions/ProjectActions";
// import { ProjectProps } from "@/types/type";

// export default function DashboardCards() {
//   const { data: projectsData, isLoading } = useQuery({
//     queryKey: ["projects"],
//     queryFn: fetchProjects,
//   });

//   const [projects, setProjects] = useState<ProjectProps[]>([]);
//   const [loading, setLoading] = useState(true);

//   //   const countedProjects = fetchProjects?.length || 0;
//   //   console.log(countedProjects);

//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const fetchedProjects = await fetchProjects();
//         if (fetchedProjects) {
//           setProjects(fetchedProjects);
//         }
//       } catch (error) {
//         console.error("Failed to fetch projects:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProjects();

//   }, []);

//   const countedProjects = projects.length;

//   // Calculate the number of projects created in the last 30 days
//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//   const recentProjects =
//     projectsData?.filter(
//       (project) => new Date(project.createdAt) > thirtyDaysAgo
//     ).length || 0;

//   // Dummy data for portfolio-specific metrics
//   const totalViews = 15000;
//   const averageRating = 4.8;
//   const skillProgress = countedProjects;

//   if (isLoading) {
//     return <DashboardSkeleton />;
//   }
//   if (loading) {
//     return <DashboardSkeleton />;
//   }

//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
//           <Briefcase className="h-4 w-4 text-purple-200" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{countedProjects}</div>
//           <p className="text-xs text-purple-200">Lifetime projects</p>
//         </CardContent>
//       </Card>

//       <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Recent Projects</CardTitle>
//           <Zap className="h-4 w-4 text-green-200" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{recentProjects}</div>
//           <p className="text-xs text-green-200">Last 30 days</p>
//         </CardContent>
//       </Card>

//       <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Portfolio Views</CardTitle>
//           <Eye className="h-4 w-4 text-blue-200" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">
//             {totalViews.toLocaleString()}
//           </div>
//           <p className="text-xs text-blue-200">Total impressions</p>
//         </CardContent>
//       </Card>

//       <Card className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
//           <Star className="h-4 w-4 text-yellow-200" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
//           <p className="text-xs text-yellow-200">Based on client feedback</p>
//         </CardContent>
//       </Card>

//       <Card className="md:col-span-2 lg:col-span-4">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Projects Progress
//           </CardTitle>
//           <Code className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <Progress value={skillProgress} className="w-full" />
//           <p className="mt-2 text-xs text-muted-foreground">
//             {skillProgress}% proficiency in core technologies
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// function DashboardSkeleton() {
//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       {[...Array(4)].map((_, i) => (
//         <Card key={i}>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <Skeleton className="h-4 w-[100px]" />
//             <Skeleton className="h-4 w-4 rounded-full" />
//           </CardHeader>
//           <CardContent>
//             <Skeleton className="h-8 w-[60px] mb-2" />
//             <Skeleton className="h-4 w-[120px]" />
//           </CardContent>
//         </Card>
//       ))}
//       <Card className="md:col-span-2 lg:col-span-4">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <Skeleton className="h-4 w-[100px]" />
//           <Skeleton className="h-4 w-4 rounded-full" />
//         </CardHeader>
//         <CardContent>
//           <Skeleton className="h-4 w-full mb-2" />
//           <Skeleton className="h-4 w-[200px]" />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Eye, Star, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProjects } from "@/Actions/ProjectActions";
import { ProjectProps } from "@/types/type";

interface Stats {
  totalViews: number;
  averageRating: number;
  uniqueVisitors: number;
  frequentVisitors: number;
}

export default function DashboardCards() {
  // const { isLoading } = useQuery({
  //   queryKey: ["projects"],
  //   queryFn: fetchProjects,
  // });

  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalViews: 0,
    averageRating: 0,
    uniqueVisitors: 0,
    frequentVisitors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();
        if (fetchedProjects) {
          setProjects(fetchedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();

    // Set up SSE for real-time visitor stats updates
    const eventSource = new EventSource("/api/visitor-stats");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStats(data);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const countedProjects = projects.length;
  const skillProgress = Math.min(countedProjects * 2, 100);
  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <Briefcase className="h-4 w-4 text-purple-200" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{countedProjects}</div>
          <p className="text-xs text-purple-200">Lifetime projects</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          <Zap className="h-4 w-4 text-green-200" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.uniqueVisitors.toLocaleString()}
          </div>
          <p className="text-xs text-pink-200">Total unique visitors</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Portfolio Views</CardTitle>
          <Eye className="h-4 w-4 text-blue-200" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalViews.toLocaleString()}
          </div>
          <p className="text-xs text-blue-200">Total impressions</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-yellow-200" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.averageRating.toFixed(1)}
          </div>
          <p className="text-xs text-yellow-200">Based on client feedback</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Projects Progress
          </CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Progress value={skillProgress} className="w-full" />
          <p className="mt-2 text-xs text-muted-foreground">
            {skillProgress}% proficiency in core technologies
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px] mb-2" />
            <Skeleton className="h-4 w-[120px]" />
          </CardContent>
        </Card>
      ))}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-[200px]" />
        </CardContent>
      </Card>
    </div>
  );
}
