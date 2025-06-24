
import { useState, useEffect, useRef } from 'react';

interface RealTimeMetrics {
  totalUsers: number;
  asvoStaked: string;
  tvl: string;
  icoProgress: number;
  userGrowth: string;
  stakingGrowth: string;
  tvlGrowth: string;
  uptime: string;
  responseTime: string;
  activeSessions: number;
  tokenPrice: string;
  marketCap: string;
  volume24h: string;
  newUsers: number;
  weeklyGrowth: string;
  revenue: string;
}

export const useRealTimeData = () => {
  const [isLive, setIsLive] = useState(false);
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    totalUsers: 15432,
    asvoStaked: '75M',
    tvl: '$3.75M',
    icoProgress: 13.5,
    userGrowth: '+12.5%',
    stakingGrowth: '+8.3%',
    tvlGrowth: '+15.7%',
    uptime: '99.98%',
    responseTime: '142ms',
    activeSessions: 2847,
    tokenPrice: '$0.048',
    marketCap: '$4.2M',
    volume24h: '$156K',
    newUsers: 247,
    weeklyGrowth: '+23.4%',
    revenue: '$89.2K'
  });

  const intervalRef = useRef<NodeJS.Timeout>();

  const startLiveData = () => {
    setIsLive(true);
    intervalRef.current = setInterval(() => {
      setMetrics(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
        asvoStaked: `${(parseFloat(prev.asvoStaked.replace('M', '')) + Math.random() * 0.1).toFixed(1)}M`,
        tvl: `$${(parseFloat(prev.tvl.replace('$', '').replace('M', '')) + Math.random() * 0.05).toFixed(2)}M`,
        icoProgress: Math.min(prev.icoProgress + Math.random() * 0.1, 100),
        userGrowth: `+${(Math.random() * 5 + 10).toFixed(1)}%`,
        stakingGrowth: `+${(Math.random() * 3 + 7).toFixed(1)}%`,
        tvlGrowth: `+${(Math.random() * 5 + 12).toFixed(1)}%`,
        uptime: `${(99.9 + Math.random() * 0.09).toFixed(2)}%`,
        responseTime: `${Math.floor(Math.random() * 50 + 120)}ms`,
        activeSessions: prev.activeSessions + Math.floor(Math.random() * 20 - 10),
        tokenPrice: `$${(0.045 + Math.random() * 0.006).toFixed(3)}`,
        marketCap: `$${(4.0 + Math.random() * 0.5).toFixed(1)}M`,
        volume24h: `$${Math.floor(Math.random() * 50 + 130)}K`,
        newUsers: prev.newUsers + Math.floor(Math.random() * 3),
        weeklyGrowth: `+${(Math.random() * 5 + 20).toFixed(1)}%`,
        revenue: `$${(85 + Math.random() * 10).toFixed(1)}K`
      }));
    }, 2000);
  };

  const stopLiveData = () => {
    setIsLive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isLive,
    metrics,
    startLiveData,
    stopLiveData
  };
};
