
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Users, Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="glassmorphism p-8 rounded-2xl border border-emerald-800/30">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Aussivo Platform
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Advanced ecosystem management and administration dashboard
          </p>
          <Button 
            onClick={() => navigate('/admin')}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Access Admin Panel
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-emerald-600/20 flex items-center justify-center mb-4 mx-auto">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">User Management</h3>
            <p className="text-slate-400">
              Comprehensive user account management, wallet monitoring, and activity tracking
            </p>
          </div>

          <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Governance</h3>
            <p className="text-slate-400">
              DAO proposal management, voting oversight, and reward distribution control
            </p>
          </div>

          <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4 mx-auto">
              <Settings className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Configuration</h3>
            <p className="text-slate-400">
              Platform settings, token sale management, and staking package configuration
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">15,432</p>
              <p className="text-slate-400">Total Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">75M</p>
              <p className="text-slate-400">ASVO Staked</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">$3.7M</p>
              <p className="text-slate-400">Total Value Locked</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">13.5M</p>
              <p className="text-slate-400">ASVO Sold</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
