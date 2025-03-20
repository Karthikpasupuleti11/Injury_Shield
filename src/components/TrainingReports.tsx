import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Activity,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  LayoutList,
  Sliders,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Report {
  id: string;
  athleteName: string;
  athletePhoto: string;
  date: string;
  sessionType: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  insights: string[];
  recommendations: string[];
}

const mockReports: Report[] = [
  {
    id: '1',
    athleteName: 'John Smith',
    athletePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    date: '2025-03-15',
    sessionType: 'Strength Training',
    riskLevel: 'Medium',
    insights: [
      'Asymmetric knee loading detected',
      'Core stability improved by 15%',
      'Recovery metrics within optimal range'
    ],
    recommendations: [
      'Focus on bilateral exercises',
      'Increase mobility work',
      'Maintain current recovery protocol'
    ]
  },
  {
    id: '2',
    athleteName: 'Sarah Johnson',
    athletePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    date: '2025-03-14',
    sessionType: 'Speed & Agility',
    riskLevel: 'Low',
    insights: [
      'Peak acceleration improved',
      'Optimal movement patterns maintained',
      'No significant fatigue indicators'
    ],
    recommendations: [
      'Progress to advanced drills',
      'Continue current training load',
      'Monitor recovery markers'
    ]
  },
  // Add more mock data as needed
];

const TrainingReports: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary']));

  const toggleSection = (section: string) => {
    const newExpandedSections = new Set(expandedSections);
    if (newExpandedSections.has(section)) {
      newExpandedSections.delete(section);
    } else {
      newExpandedSections.add(section);
    }
    setExpandedSections(newExpandedSections);
  };

  const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
    switch (risk) {
      case 'Low':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'High':
        return 'text-red-500';
    }
  };

  const getRiskIcon = (risk: 'Low' | 'Medium' | 'High') => {
    switch (risk) {
      case 'Low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'High':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-4xl font-bold mb-4">Training Reports</h1>
          <p className="text-gray-400">
            Comprehensive analysis and insights for athlete performance monitoring
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors">
                <Sliders className="w-5 h-5" />
              </button>
              <div className="bg-gray-700 rounded-lg flex">
                <button 
                  className={`p-2 rounded-l-lg transition-colors ${viewMode === 'grid' ? 'bg-red-500' : 'hover:bg-gray-600'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button 
                  className={`p-2 rounded-r-lg transition-colors ${viewMode === 'list' ? 'bg-red-500' : 'hover:bg-gray-600'}`}
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid/List */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6 mb-8`}>
          {mockReports.map(report => (
            <div 
              key={report.id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              <div className="relative h-48">
                <img 
                  src={report.athletePhoto}
                  alt={report.athleteName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold mb-1">{report.athleteName}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getRiskIcon(report.riskLevel)}
                      <span className={`text-sm ${getRiskColor(report.riskLevel)}`}>
                        {report.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                  <Activity className="w-4 h-4" />
                  <span>{report.sessionType}</span>
                </div>
                <div className="space-y-2">
                  {report.insights.slice(0, 2).map((insight, index) => (
                    <p key={index} className="text-sm text-gray-300">• {insight}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Report Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedReport.athletePhoto}
                      alt={selectedReport.athleteName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedReport.athleteName}</h2>
                      <p className="text-gray-400">{selectedReport.sessionType}</p>
                    </div>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-white"
                    onClick={() => setSelectedReport(null)}
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>{new Date(selectedReport.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getRiskIcon(selectedReport.riskLevel)}
                      <span className={`${getRiskColor(selectedReport.riskLevel)}`}>
                        {selectedReport.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Export Report</span>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Summary Section */}
                <div className="space-y-4">
                  <button 
                    className="w-full flex items-center justify-between"
                    onClick={() => toggleSection('summary')}
                  >
                    <h3 className="text-xl font-semibold">Performance Summary</h3>
                    {expandedSections.has('summary') ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {expandedSections.has('summary') && (
                    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
                      <h4 className="font-semibold mb-2">Key Insights</h4>
                      <ul className="space-y-2">
                        {selectedReport.insights.map((insight, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-red-500">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="font-semibold mb-2">Recommendations</h4>
                      <ul className="space-y-2">
                        {selectedReport.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-red-500">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Movement Analysis Section */}
                <div className="space-y-4">
                  <button 
                    className="w-full flex items-center justify-between"
                    onClick={() => toggleSection('movement')}
                  >
                    <h3 className="text-xl font-semibold">Movement Analysis</h3>
                    {expandedSections.has('movement') ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {expandedSections.has('movement') && (
                    <div className="bg-gray-700 rounded-xl p-6">
                      <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                        <p className="text-gray-400">Movement analysis visualization</p>
                      </div>
                      <p className="text-gray-300">
                        Detailed movement analysis and comparison data will be displayed here.
                      </p>
                    </div>
                  )}
                </div>

                {/* Risk Assessment Section */}
                <div className="space-y-4">
                  <button 
                    className="w-full flex items-center justify-between"
                    onClick={() => toggleSection('risk')}
                  >
                    <h3 className="text-xl font-semibold">Risk Assessment</h3>
                    {expandedSections.has('risk') ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {expandedSections.has('risk') && (
                    <div className="bg-gray-700 rounded-xl p-6">
                      <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                        <p className="text-gray-400">Risk assessment heat maps</p>
                      </div>
                      <p className="text-gray-300">
                        Comprehensive risk assessment data and visualizations will be shown here.
                      </p>
                    </div>
                  )}
                </div>

                {/* Historical Data Section */}
                <div className="space-y-4">
                  <button 
                    className="w-full flex items-center justify-between"
                    onClick={() => toggleSection('history')}
                  >
                    <h3 className="text-xl font-semibold">Historical Performance</h3>
                    {expandedSections.has('history') ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {expandedSections.has('history') && (
                    <div className="bg-gray-700 rounded-xl p-6">
                      <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                        <p className="text-gray-400">Historical performance graphs</p>
                      </div>
                      <p className="text-gray-300">
                        Trend analysis and historical performance data will be displayed here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingReports;