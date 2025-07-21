import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Brain, Shield, Users, ArrowRight, Sparkles, MessageCircle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Empati',
      description: 'Teknologi AI yang memahami dan merespon dengan empati terhadap perasaan Anda'
    },
    {
      icon: Shield,
      title: 'Privasi Terjamin',
      description: 'Semua percakapan Anda aman dan terlindungi dengan enkripsi end-to-end'
    },
    {
      icon: Users,
      title: 'Komunitas Suportif',
      description: 'Bergabung dengan komunitas yang saling mendukung dalam perjalanan kesehatan mental'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Dukungan Kesehatan Mental dengan AI</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Temukan{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ketenangan
              </span>
              <br />
              dengan MindRelief
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Platform kesehatan mental yang didukung AI untuk membantu Anda mengatasi stress, 
              kecemasan, dan menemukan keseimbangan hidup yang lebih baik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/analisis">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  🧠 Mulai Analisis Mental
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/curhat">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                >
                  💬 Curhat dengan AI
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                ✨ Fitur Unggulan MindRelief
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Platform komprehensif yang menggabungkan teknologi AI terdepan dengan pendekatan psikologi modern 
                untuk memberikan dukungan kesehatan mental yang personal dan efektif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  💬 AI Curhat
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Berbagi perasaan dengan AI yang empati dan mendukung. Dapatkan respon yang menenangkan dan membantu 
                  kapan saja Anda membutuhkannya.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Respon empati 24/7</li>
                  <li>• Privasi terjamin</li>
                  <li>• Dukungan emosional instant</li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  🧠 Analisis Mental AI
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Formulir komprehensif untuk menganalisis kondisi mental Anda dengan bantuan AI Gemini yang canggih. 
                  Dapatkan insight mendalam tentang kesehatan mental Anda.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Analisis mendalam dengan AI Gemini</li>
                  <li>• 9 parameter kesehatan mental</li>
                  <li>• Rekomendasi personal</li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  📊 Dashboard Interaktif
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Visualisasi hasil analisis dalam bentuk grafik dan chart yang mudah dipahami. 
                  Termasuk saran praktis dan motivasi personal dari AI.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Grafik tingkat stres real-time</li>
                  <li>• Distribusi emosi interaktif</li>
                  <li>• Saran & motivasi personal</li>
                </ul>
              </motion.div>
            </div>

            {/* How It Works Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  🚀 Cara Kerja MindRelief
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Proses sederhana dalam 3 langkah untuk mendapatkan dukungan kesehatan mental yang Anda butuhkan
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Isi Formulir Analisis
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Lengkapi 9 parameter kesehatan mental dalam formulir yang mudah dan aman
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    AI Menganalisis Data
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Gemini AI memproses data Anda dengan algoritma psikologi terdepan
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Dapatkan Insight & Saran
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Terima dashboard interaktif dengan saran praktis dan motivasi personal
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Siap untuk Memulai Perjalanan Healing Anda?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan orang yang telah merasakan manfaat dukungan AI untuk kesehatan mental mereka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analisis">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🧠 Mulai Analisis Sekarang
                </Button>
              </Link>
              <Link to="/curhat">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                >
                  💬 Curhat Dulu
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

