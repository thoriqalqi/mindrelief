import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Brain, TrendingUp, Heart, AlertCircle, CheckCircle, 
  ArrowLeft, Download, Share2, Target, Lightbulb, MessageSquareText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalysis } from '@/context/AnalysisContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { analysisData, analysisResult } = useAnalysis();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Redirect jika tidak ada data
  useEffect(() => {
    if (!analysisData || !analysisResult) {
      navigate('/analisis');
    }
  }, [analysisData, analysisResult, navigate]);

  if (!analysisData || !analysisResult) {
    return null;
  }

  // Data untuk grafik tingkat stres (menggunakan data dari AI)
  const stressData = [
    { 
      name: 'Tingkat Stres', 
      value: analysisResult.tingkatStres, 
      color: analysisResult.tingkatStres > 70 ? '#ef4444' : analysisResult.tingkatStres > 40 ? '#f59e0b' : '#22c55e'
    },
    { 
      name: 'Kesehatan Mental', 
      value: 100 - analysisResult.tingkatStres, 
      color: analysisResult.tingkatStres > 70 ? '#22c55e' : analysisResult.tingkatStres > 40 ? '#3b82f6' : '#10b981'
    }
  ];

  // Data untuk pie chart emosi (langsung dari AI response)
  const emotionData = Object.entries(analysisResult.emosiUtama).map(([emotion, value]) => ({
    name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
    value: value,
    color: getEmotionColor(emotion)
  }));

  function getEmotionColor(emotion) {
    const colors = {
      bahagia: '#fbbf24',
      netral: '#6b7280',
      tertekan: '#ef4444',
      sedih: '#3b82f6',
      marah: '#dc2626'
    };
    return colors[emotion] || '#6b7280';
  }

  function getStressLevel(score) {
    if (score <= 30) return { level: 'Rendah', color: 'bg-green-500', textColor: 'text-green-700' };
    if (score <= 60) return { level: 'Sedang', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    return { level: 'Tinggi', color: 'bg-red-500', textColor: 'text-red-700' };
  }

  const stressLevel = getStressLevel(analysisResult.tingkatStres);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-20 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Memproses Analisis...
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Sedang menyiapkan dashboard hasil analisis Anda
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => navigate('/analisis')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Analisis</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Unduh Laporan
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              <span>Dashboard Analisis Mental</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              📊 Hasil Analisis Mental
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Halo <span className="font-semibold text-blue-600 dark:text-blue-400">{analysisData.namaLengkap}</span>, 
              berikut adalah hasil analisis kesehatan mental Anda
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-700 dark:text-red-300 text-sm font-medium">
                Tingkat Stres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {analysisResult.tingkatStres}%
                  </div>
                  <Badge className={`${stressLevel.color} text-white mt-2`}>
                    {stressLevel.level}
                  </Badge>
                </div>
                <TrendingUp className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                Umur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {analysisData.umur}
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    tahun
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-700 dark:text-purple-300 text-sm font-medium">
                Kecemasan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {analysisData.tingkatKecemasan[0]}/5
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                    level
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-700 dark:text-green-300 text-sm font-medium">
                Status Tidur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400 capitalize">
                    {analysisData.frekuensiTidur.replace('-', ' ')}
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    kualitas
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Stress Level Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  <span>Tingkat Stres</span>
                </CardTitle>
                <CardDescription>
                  Persentase tingkat stres berdasarkan analisis AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Emotion Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span>Distribusi Emosi</span>
                </CardTitle>
                <CardDescription>
                  Komposisi emosi berdasarkan analisis kondisi mental
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emotionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emotionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Analysis Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ringkasan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <span>Ringkasan Kondisi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {analysisResult.ringkasan}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Data Input:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Jenis Kelamin:</span>
                        <span className="ml-2 font-medium capitalize">{analysisData.jenisKelamin}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Suasana Hati:</span>
                        <span className="ml-2 font-medium capitalize">{analysisData.suasanaHati}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Fokus:</span>
                        <span className="ml-2 font-medium capitalize">{analysisData.kesulitanFokus}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Motivasi:</span>
                        <span className="ml-2 font-medium capitalize">{analysisData.motivasiHarian}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rekomendasi */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Rekomendasi AI</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {analysisResult.rekomendasi}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Keresahan Utama:</h4>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                        "{analysisData.keresahan}"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Saran & Motivasi dari AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Saran Praktis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-800 dark:text-yellow-200">Saran Praktis</span>
                </CardTitle>
                <CardDescription className="text-yellow-700 dark:text-yellow-300">
                  Tips yang bisa diterapkan dalam kehidupan sehari-hari
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">
                    {analysisResult.saran}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Motivasi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageHeart className="w-5 h-5 text-pink-600" />
                  <span className="text-pink-800 dark:text-pink-200">Kata Motivasi</span>
                </CardTitle>
                <CardDescription className="text-pink-700 dark:text-pink-300">
                  Dukungan dan semangat untuk perjalanan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <p className="text-pink-800 dark:text-pink-200 leading-relaxed font-medium">
                    {analysisResult.motivasi}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/curhat')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              💬 Lanjut Curhat dengan AI
            </Button>
            <Button
              onClick={() => navigate('/analisis')}
              variant="outline"
              className="px-8 py-3"
            >
              🔄 Analisis Ulang
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hasil analisis ini bersifat informatif dan tidak menggantikan konsultasi dengan profesional kesehatan mental. 
            Jika Anda merasa membutuhkan bantuan lebih lanjut, disarankan untuk berkonsultasi dengan psikolog atau psikiater.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;

