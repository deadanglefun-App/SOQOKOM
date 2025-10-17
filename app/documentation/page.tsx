'use client';

import { Book, Code, Wallet, Shield, Users } from 'lucide-react';

export default function Documentation() {
  const sections = [
    {
      icon: Wallet,
      title: 'Getting Started',
      items: ['Connect MetaMask', 'Get SQKM Tokens', 'First Trade', 'Understanding Fees']
    },
    {
      icon: Code,
      title: 'Developer Guide',
      items: ['Smart Contract API', 'Integration Guide', 'SDK Documentation', 'Testing Environment']
    },
    {
      icon: Shield,
      title: 'Security',
      items: ['Audit Reports', 'Best Practices', 'Risk Management', 'Insurance Fund']
    },
    {
      icon: Users,
      title: 'Governance',
      items: ['Voting Mechanism', 'Proposal Creation', 'Voting Power', 'Execution Process']
    }
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 animated-grid opacity-20"></div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Book className="h-20 w-20 mx-auto mb-6 text-purple-400" />
            <h1 className="text-5xl font-bold mb-4 silver-gradient">Documentation</h1>
            <p className="text-gray-400 text-lg">Complete guides and resources for SOQOKOM</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {sections.map((section, index) => (
              <div key={index} className="tech-card p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center border-2 border-purple-400">
                    <section.icon className="h-7 w-7 text-silver-200" />
                  </div>
                  <h2 className="text-2xl font-bold text-purple-300">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="tech-card p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4 silver-gradient">Detailed Documentation</h2>
            <p className="text-gray-400 text-lg mb-6">
              Comprehensive documentation with code examples, tutorials, and best practices is currently in preparation.
            </p>
            <p className="text-purple-300 font-semibold">
              Coming Soon - Stay Tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
