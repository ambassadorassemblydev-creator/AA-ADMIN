/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/Dashboard";
import MembersList from "./components/MembersList";
import ProfileSettings from "./components/ProfileSettings";
import Sermons from "./components/Sermons";
import AdminControls from "./components/AdminControls";
import Ministries from "./components/Ministries";
import Departments from "./components/Departments";
import Giving from "./components/Giving";
import PrayerRequests from "./components/PrayerRequests";
import Events from "./components/Events";
import MediaGallery from "./components/MediaGallery";
import Attendance from "./components/Attendance";
import AILab from "./components/AILab";
import Products from "./components/Products";
import Tasks from "./components/Tasks";
import PrayerWall from "./components/PrayerWall";
import Resources from "./components/Resources";
import GivingGoals from "./components/GivingGoals";
import Milestones from "./components/Milestones";
import Reports from "./components/Reports";
import Volunteers from "./components/Volunteers";
import Login from "./components/Login";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Loader2 } from "lucide-react";

function AppContent() {
  const { session, loading } = useAuth();
  const [activeTab, setActiveTab] = React.useState("dashboard");

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
        </div>
        <p className="mt-4 text-sm font-medium text-muted-foreground uppercase tracking-widest animate-pulse">Initializing System...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <TooltipProvider>
        <Login onLogin={() => {}} />
        <Toaster 
          position="top-right" 
          richColors 
          closeButton 
          expand={true}
          theme="light"
          toastOptions={{
            className: "rounded-2xl border-none shadow-2xl backdrop-blur-xl bg-card/80",
            style: {
              fontFamily: 'inherit'
            }
          }}
        />
      </TooltipProvider>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onTabChange={setActiveTab} />;
      case "members":
        return <MembersList />;
      case "sermons":
        return <Sermons />;
      case "profile":
        return <ProfileSettings />;
      case "admin":
        return <AdminControls />;
      case "admin-settings":
        return <AdminControls defaultTab="general" />;
      case "admin-roles":
        return <AdminControls defaultTab="roles" />;
      case "admin-system":
        return <AdminControls defaultTab="system" />;
      case "admin-audit":
        return <AdminControls defaultTab="audit" />;
      case "ministries":
        return <Ministries />;
      case "departments":
        return <Departments />;
      case "donations":
        return <Giving />;
      case "prayers":
        return <PrayerRequests />;
      case "events":
        return <Events />;
      case "media":
        return <MediaGallery />;
      case "attendance":
        return <Attendance />;
      case "ai-lab":
        return <AILab />;
      case "products":
        return <Products />;
      case "tasks":
        return <Tasks />;
      case "prayer-wall":
        return <PrayerWall />;
      case "resources":
        return <Resources />;
      case "giving-goals":
        return <GivingGoals />;
      case "milestones":
        return <Milestones />;
      case "reports":
        return <Reports />;
      case "volunteers":
        return <Volunteers />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <TooltipProvider>
      <Layout onTabChange={setActiveTab} activeTab={activeTab}>
        {renderContent()}
      </Layout>
      <Toaster 
        position="top-right" 
        richColors 
        closeButton 
        expand={true}
        theme="light"
        toastOptions={{
          className: "rounded-2xl border-none shadow-2xl backdrop-blur-xl bg-card/80",
          style: {
            fontFamily: 'inherit'
          }
        }}
      />
    </TooltipProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}









