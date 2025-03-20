import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Upload, Play, Square, Download, Camera, Image as ImageIcon, AlertCircle, Trash2 } from 'lucide-react';

const PerformanceAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'upload'>('live');
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [riskScore, setRiskScore] = useState<number>(0);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  const [movementFeedback, setMovementFeedback] = useState<string[]>([]);

  // Simulated analysis that updates risk score and feedback
  const runAnalysis = useCallback(() => {
    setAnalysisInProgress(true);
    setRiskScore(0);
    setMovementFeedback([]);

    const interval = setInterval(() => {
      setRiskScore(prev => {
        const newScore = Math.min(prev + Math.random() * 5, 100);
        if (newScore >= 100) {
          clearInterval(interval);
          setAnalysisInProgress(false);
          setMovementFeedback([
            'Potential knee strain detected',
            'Asymmetric landing pattern observed',
            'Core stability needs improvement',
            'Consider adjusting movement pattern'
          ]);
        }
        return newScore;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleStartRecording = useCallback(() => {
    if (!webcamRef.current?.stream) return;

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    });

    mediaRecorderRef.current.addEventListener('dataavailable', ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks(prev => [...prev, data]);
      }
    });

    mediaRecorderRef.current.addEventListener('stop', () => {
      runAnalysis();
    });

    setRecordedChunks([]);
    mediaRecorderRef.current.start();
    setIsRecording(true);
  }, [runAnalysis]);

  const handleStopRecording = useCallback(() => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  }, []);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length === 0) return;

    const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'performance-analysis.webm';
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, [recordedChunks]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      runAnalysis();
    }
  }, [runAnalysis]);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      runAnalysis();
    }
  }, [runAnalysis]);

  const handleClearUpload = useCallback(() => {
    setUploadedFile(null);
    setRiskScore(0);
    setMovementFeedback([]);
  }, []);

  const preventDefaultDrag = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Performance Analysis</h1>
          <div className="flex space-x-4">
            <button
              className={`px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform ${
                activeTab === 'live' ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
              }`}
              onClick={() => setActiveTab('live')}
            >
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Live AI Motion Analysis</span>
              </div>
            </button>
            <button
              className={`px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform ${
                activeTab === 'upload' ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Uploaded Media Analysis</span>
              </div>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Panel - Video Display */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl transition-all ease-in-out duration-300">
            {activeTab === 'live' ? (
              <div className="relative">
                <Webcam
                  ref={webcamRef}
                  className="w-full rounded-lg transition-all duration-300"
                  mirrored
                  audio={false}
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <button
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isRecording ? 'bg-red-500 scale-105' : 'bg-white hover:bg-gray-200'
                    } text-black hover:opacity-90`}
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                  >
                    {isRecording ? (
                      <Square className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center relative"
                onDrop={handleDrop}
                onDragOver={preventDefaultDrag}
                onDragEnter={preventDefaultDrag}
              >
                {uploadedFile ? (
                  <div className="w-full relative">
                    <video
                      src={URL.createObjectURL(uploadedFile)}
                      className="w-full rounded-lg transition-transform duration-300 transform hover:scale-105"
                      controls
                    />
                    <button
                      onClick={handleClearUpload}
                      className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-400 mb-4">
                      Drag and drop your video here or
                    </p>
                    <label className="bg-red-500 px-6 py-3 rounded-lg cursor-pointer hover:bg-red-600 transition-colors ease-in-out duration-200">
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Analysis */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl transition-all ease-in-out duration-300">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Analysis Results</h2>
              <div className="flex items-center space-x-2 text-gray-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">
                  {analysisInProgress ? 'Analysis in progress...' : 'Ready for analysis'}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Injury Risk Score</span>
                <span className="text-2xl font-bold text-red-500">{Math.round(riskScore)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-300"
                  style={{ width: `${riskScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Movement Analysis</h3>
                <div className="space-y-2">
                  {movementFeedback.length > 0 ? (
                    movementFeedback.map((feedback, index) => (
                      <p key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <span className="text-red-500">•</span>
                        <span>{feedback}</span>
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-300 text-sm">
                      Start recording or upload a video to begin analysis
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Recommendations</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">•</span>
                    <span>Maintain proper form during exercises</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">•</span>
                    <span>Focus on controlled movements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500">•</span>
                    <span>Keep core engaged throughout</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              className={`mt-6 w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out ${
                recordedChunks.length > 0 || uploadedFile
                  ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
              onClick={handleDownload}
              disabled={recordedChunks.length === 0 && !uploadedFile}
            >
              <Download className="w-5 h-5" />
              <span>Download Analysis Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
