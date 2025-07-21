import { createContext, useContext, useState } from 'react';

const AnalysisContext = createContext();

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

export const AnalysisProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveAnalysisData = (data) => {
    setAnalysisData(data);
  };

  const saveAnalysisResult = (result) => {
    setAnalysisResult(result);
  };

  const clearAnalysisData = () => {
    setAnalysisData(null);
    setAnalysisResult(null);
  };

  const value = {
    analysisData,
    analysisResult,
    isLoading,
    saveAnalysisData,
    saveAnalysisResult,
    setIsLoading,
    clearAnalysisData
  };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};

export default AnalysisContext;