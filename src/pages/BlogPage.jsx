import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, MessageCircle, Heart, Share2, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPage = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Mock data blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Perjalanan Saya Mengatasi Anxiety: Cerita Personal",
      excerpt: "Berbagi pengalaman pribadi tentang bagaimana saya belajar mengelola kecemasan dan menemukan ketenangan dalam hidup.",
      content: "Ini adalah cerita personal tentang perjalanan saya...",
      author: "Sarah M.",
      date: "2024-01-20",
      readTime: "8 min",
      category: "Personal Story",
      likes: 124,
      comments: 23,
      image: "/api/placeholder/600/300",
      tags: ["anxiety", "personal story", "recovery"]
    },
    {
      id: 2,
      title: "Tips Self-Care yang Benar-Benar Membantu",
      excerpt: "Rutinitas self-care sederhana yang telah terbukti efektif dalam menjaga kesehatan mental sehari-hari.",
      content: "Self-care bukan hanya tentang spa dan bubble bath...",
      author: "Dr. Maya K.",
      date: "2024-01-18",
      readTime: "6 min",
      category: "Tips & Tricks",
      likes: 89,
      comments: 15,
      image: "/api/placeholder/600/300",
      tags: ["self-care", "wellness", "daily routine"]
    },
    {
      id: 3,
      title: "Mengapa Therapy Tidak Selalu Menakutkan",
      excerpt: "Menghilangkan stigma tentang terapi dan berbagi pengalaman positif dalam mencari bantuan profesional.",
      content: "Banyak orang masih takut untuk mencari bantuan profesional...",
      author: "Ahmad R.",
      date: "2024-01-15",
      readTime: "10 min",
      category: "Mental Health Awareness",
      likes: 156,
      comments: 34,
      image: "/api/placeholder/600/300",
      tags: ["therapy", "mental health", "stigma"]
    },
    {
      id: 4,
      title: "Mindfulness untuk Pemula: Mulai dari Mana?",
      excerpt: "Panduan praktis untuk memulai praktik mindfulness tanpa merasa kewalahan atau bingung.",
      content: "Mindfulness mungkin terdengar rumit, tapi sebenarnya...",
      author: "Lisa P.",
      date: "2024-01-12",
      readTime: "7 min",
      category: "Mindfulness",
      likes: 78,
      comments: 19,
      image: "/api/placeholder/600/300",
      tags: ["mindfulness", "meditation", "beginner"]
    },
    {
      id: 5,
      title: "Mengatasi Burnout di Usia Muda",
      excerpt: "Strategi untuk mengenali dan mengatasi burnout yang semakin umum dialami generasi muda.",
      content: "Burnout bukan hanya dialami oleh pekerja senior...",
      author: "Budi H.",
      date: "2024-01-10",
      readTime: "9 min",
      category: "Work-Life Balance",
      likes: 203,
      comments: 41,
      image: "/api/placeholder/600/300",
      tags: ["burnout", "young adults", "work stress"]
    },
    {
      id: 6,
      title: "Membangun Support System yang Kuat",
      excerpt: "Cara membangun dan memelihara jaringan dukungan yang dapat diandalkan dalam perjalanan mental health.",
      content: "Support system yang kuat adalah fondasi penting...",
      author: "Rina S.",
      date: "2024-01-08",
      readTime: "8 min",
      category: "Relationships",
      likes: 92,
      comments: 27,
      image: "/api/placeholder/600/300",
      tags: ["support system", "relationships", "community"]
    }
  ];

  const categories = [
    "All Posts",
    "Personal Story",
    "Tips & Tricks",
    "Mental Health Awareness",
    "Mindfulness",
    "Work-Life Balance",
    "Relationships"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const filteredPosts = selectedCategory === "All Posts" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

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
          <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Cerita & Pengalaman</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog MindRelief
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cerita inspiratif, tips praktis, dan pengalaman nyata dari komunitas MindRelief.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Featured Image */}
                <div className="relative h-64 lg:h-auto bg-gradient-to-r from-purple-400 to-pink-500">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Featured Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                      {filteredPosts[0].category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(filteredPosts[0].date).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {filteredPosts[0].title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    {filteredPosts[0].excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{filteredPosts[0].author}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{filteredPosts[0].readTime}</span>
                    </div>

                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      Baca Selengkapnya
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.slice(1).map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group"
            >
              {/* Post Image */}
              <div className="relative h-48 bg-gradient-to-r from-purple-400 to-pink-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        likedPosts.has(post.id)
                          ? 'text-red-500'
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm">
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </span>
                    </button>

                    <div className="flex items-center space-x-1 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* No Posts */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Belum Ada Post
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Kategori ini belum memiliki post. Coba pilih kategori lain.
            </p>
            <Button
              onClick={() => setSelectedCategory("All Posts")}
              variant="outline"
              className="px-6 py-3"
            >
              Lihat Semua Post
            </Button>
          </motion.div>
        )}

        {/* Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bagikan Cerita Anda
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Cerita Anda bisa menginspirasi dan membantu orang lain. Mari berbagi pengalaman!
          </p>
          <Button
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full"
          >
            Tulis Cerita
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;

