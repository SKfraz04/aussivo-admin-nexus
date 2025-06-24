
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/52714c81-055a-4ac9-b5fd-ed0b99a1bad2.png" 
            alt="Aussivo Logo" 
            className="h-16 w-auto"
          />
        </div>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-300">
              Sign in to access the Aussivo Admin Panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-black/20 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-black/20 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-800/30">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials Display */}
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h4 className="text-sm font-medium text-white mb-2">Demo Credentials:</h4>
              <div className="text-xs text-slate-300 space-y-1">
                <div>Username: <span className="text-emerald-400 font-mono">admin</span></div>
                <div>Password: <span className="text-emerald-400 font-mono">admin123</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
