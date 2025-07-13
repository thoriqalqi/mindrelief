import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, User, ArrowRight, BookOpen, Heart, Brain, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ArtikelPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data artikel
  const articles = [
    {
      id: 1,
      title: "5 Cara Mengatasi Kecemasan di Era Digital",
      excerpt: "Pelajari teknik-teknik efektif untuk mengelola kecemasan yang sering muncul akibat penggunaan teknologi berlebihan.",
      category: "kecemasan",
      author: "Dr. Sarah Wijaya",
      readTime: "5 min",
      date: "2024-01-15",
      image: "/api/placeholder/400/250",
      tags: ["kecemasan", "digital wellness", "mindfulness"]
    },
    {
      id: 2,
      title: "Memahami Depresi: Gejala dan Cara Mengatasinya",
      excerpt: "Panduan lengkap untuk memahami depresi, mengenali gejalanya, dan langkah-langkah yang dapat diambil untuk pemulihan.",
      category: "depresi",
      author: "Prof. Ahmad Santoso",
      readTime: "8 min",
      date: "2024-01-12",
      image: "/api/placeholder/400/250",
      tags: ["depresi", "kesehatan mental", "terapi"]
    },
    {
      id: 3,
      title: "Teknik Mindfulness untuk Kehidupan Sehari-hari",
      excerpt: "Praktik mindfulness sederhana yang dapat diterapkan dalam rutinitas harian untuk meningkatkan kesejahteraan mental.",
      category: "mindfulness",
      author: "Lisa Pratiwi, M.Psi",
      readTime: "6 min",
      date: "2024-01-10",
      image: "/api/placeholder/400/250",
      tags: ["mindfulness", "meditasi", "stress relief"]
    },
    {
      id: 4,
      title: "Pentingnya Self-Care dalam Menjaga Kesehatan Mental",
      excerpt: "Mengapa self-care bukan sekadar tren, tetapi kebutuhan penting untuk menjaga keseimbangan mental dan emosional.",
      category: "self-care",
      author: "Dr. Maya Sari",
      readTime: "7 min",
      date: "2024-01-08",
      image: "/api/placeholder/400/250",
      tags: ["self-care", "wellness", "mental health"]
    },
    {
      id: 5,
      title: "Mengelola Stress di Tempat Kerja",
      excerpt: "Strategi praktis untuk mengatasi tekanan kerja dan menciptakan lingkungan kerja yang lebih sehat secara mental.",
      category: "stress",
      author: "Budi Hartono, M.Psi",
      readTime: "9 min",
      date: "2024-01-05",
      image: "/api/placeholder/400/250",
      tags: ["stress", "workplace", "productivity"]
    },
    {
      id: 6,
      title: "Hubungan Sosial yang Sehat untuk Mental yang Kuat",
      excerpt: "Bagaimana membangun dan memelihara hubungan yang mendukung kesehatan mental dan kesejahteraan emosional.",
      category: "hubungan",
      author: "Dr. Rina Kusuma",
      readTime: "6 min",
      date: "2024-01-03",
      image: "/api/placeholder/400/250",
      tags: ["hubungan", "social support", "komunikasi"]
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua', icon: BookOpen },
    { id: 'kecemasan', name: 'Kecemasan', icon: Heart },
    { id: 'depresi', name: 'Depresi', icon: Brain },
    { id: 'stress', name: 'Stress', icon: Filter },
    { id: 'mindfulness', name: 'Mindfulness', icon: Smile },
    { id: 'self-care', name: 'Self-Care', icon: Heart },
    { id: 'hubungan', name: 'Hubungan', icon: User }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Artikel & Panduan</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Artikel Kesehatan Mental
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Temukan wawasan, tips, dan panduan dari para ahli untuk mendukung perjalanan kesehatan mental Anda.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Cari artikel, topik, atau kata kunci..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 text-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <category.icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group"
            >
              {/* Article Image */}
              <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(article.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group/btn"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Artikel Tidak Ditemukan
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              variant="outline"
              className="px-6 py-3"
            >
              Reset Filter
            </Button>
          </motion.div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dapatkan Artikel Terbaru
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Berlangganan newsletter kami untuk mendapatkan tips dan artikel kesehatan mental terbaru
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Button
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold"
            >
              Berlangganan
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtikelPage;

