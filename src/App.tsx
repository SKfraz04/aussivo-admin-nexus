
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import LoginScreen from "./components/auth/LoginScreen";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/admin" 
          element={isAuthenticated ? <AdminPanel /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={isAuthenticated ? <AdminPanel section="dashboard" /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/users-wallets" 
          element={isAuthenticated ? <AdminPanel section="users-wallets" /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/deposits-transactions" 
          element={isAuthenticated ? <AdminPanel section="deposits-transactions" /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/token-package-control" 
          element={isAuthenticated ? <AdminPanel section="token-package-control" /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/staking-apy-settings" 
          element={isAuthenticated ? <AdminPanel section="staking-apy-settings" /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/referrals-leaderboard" 
          element={isAuthenticated ? <AdminPanel section="referrals-leaderboard" /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/governance-dao" 
          element={isAuthenticated ? <AdminPanel section="governance-dao" /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/rewards-burn-control" 
          element={isAuthenticated ? <AdminPanel section="rewards-burn-control" /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/staking-history-packages" 
          element={isAuthenticated ? <AdminPanel section="staking-history-packages" /> : <LoginScreen />} 
        />
        <Route 
          path="/admin/reports-analytics" 
          element={isAuthenticated ? <AdminPanel section="reports-analytics" /> : <LoginScreen />} 
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
