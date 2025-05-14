
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, BookOpen, FileText, LineChart } from 'lucide-react';

export function AppSidebar() {
  // Helper for active link styles
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-primary font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar className="w-64 border-r">
      <SidebarContent className="p-4">
        <div className="mb-8 px-4">
          <h2 className="text-2xl font-bold gradient-text">LicensePrepAI</h2>
          <p className="text-sm text-muted-foreground">USMLE Step 1 Preparation</p>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard" end className={getNavCls}>
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/practice" end className={getNavCls}>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Practice</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/content" end className={getNavCls}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Content Manager</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/analytics" end className={getNavCls}>
                <LineChart className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
