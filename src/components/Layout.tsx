
import { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { AppSidebar } from './AppSidebar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b px-6 flex items-center justify-between bg-white">
          <h1 className="text-xl font-bold gradient-text">LicensePrepAI</h1>
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </header>
        
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
