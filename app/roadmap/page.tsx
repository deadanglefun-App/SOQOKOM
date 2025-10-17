'use client';

import { Map, CheckCircle2, Circle, Clock } from 'lucide-react';

export default function Roadmap() {
  const phases = [
    {
      quarter: 'Q1 2025',
      status: 'completed',
      items: [
        'Platform Concept & Research',
        'Shariah Compliance Audit',
        'Smart Contract Development',
        'Initial Team Formation'
      ]
    },
    {
      quarter: 'Q2 2025',
      status: 'completed',
      items: [
        'Testnet Launch',
        'Security Audit',
        'Community Building',
        'Whitepaper Release'
      ]
    },
    {
      quarter: 'Q3 2025',
      status: 'active',
      items: [
        'Mainnet Launch',
        'SQKM Token Sale',
        'Staking Platform Live',
        'Initial Exchange Listings'
      ]
    },
    {
      quarter: 'Q4 2025',
      status: 'upcoming',
      items: [
        'Marketplace Launch',
        'DAO Governance Activation',
        'Mobile App Beta',
        'Partnership Announcements'
      ]
    },
    {
      quarter: 'Q1 2026',
      status: 'upcoming',
      items: [
        'Cross-chain Bridge',
        'NFT Marketplace',
        'Advanced Trading Features',
        'Global Marketing Campaign'
      ]
    },
    {
      quarter: 'Q2 2026',
      status: 'upcoming',
      items: [
        'Institutional Partnerships',
        'Fiat On/Off Ramp',
        'Mobile App Full Release',
        'Layer 2 Optimization'
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle2 className="h-6 w-6 text-green-400" />;
    if (status === 'active') return <Clock className="h-6 w-6 text-purple-400 animate-pulse" />;
    return <Circle className="h-6 w-6 text-gray-500" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'border-green-500/50 bg-green-500/10';
    if (status === 'active') return 'border-purple-500/50 bg-purple-500/10';
    return 'border-gray-500/30 bg-gray-500/5';
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 animated-grid opacity-20"></div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Map className="h-20 w-20 mx-auto mb-6 text-purple-400" />
            <h1 className="text-5xl font-bold mb-4 silver-gradient">Roadmap</h1>
            <p className="text-gray-400 text-lg">SOQOKOM Development Journey</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-purple-600 to-gray-700"></div>

            <div className="space-y-12">
              {phases.map((phase, index) => (
                <div key={index} className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}>
                  <div className="absolute left-8 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    {getStatusIcon(phase.status)}
                  </div>

                  <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className={`tech-card p-6 rounded-xl border-2 ${getStatusColor(phase.status)}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-purple-300">{phase.quarter}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          phase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          phase.status === 'active' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {phase.status}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`h-2 w-2 rounded-full mt-2 ${
                              phase.status === 'completed' ? 'bg-green-500' :
                              phase.status === 'active' ? 'bg-purple-500' :
                              'bg-gray-500'
                            }`}></div>
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 tech-card p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4 silver-gradient">Long-Term Vision</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-6">
              Our ultimate goal is to become the leading halal-compliant Web3 ecosystem, serving millions
              of users worldwide with innovative DeFi solutions that align with Islamic finance principles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="glass-effect p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-300 mb-2">2027</div>
                <div className="text-sm text-gray-400">Global Expansion</div>
              </div>
              <div className="glass-effect p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-300 mb-2">2028</div>
                <div className="text-sm text-gray-400">Banking Integration</div>
              </div>
              <div className="glass-effect p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-300 mb-2">2029</div>
                <div className="text-sm text-gray-400">Ecosystem Maturity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
