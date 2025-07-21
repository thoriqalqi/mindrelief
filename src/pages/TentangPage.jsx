import { motion } from 'framer-motion';
import { Heart, Brain, Shield, Users, Target, Award, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TentangPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Empati",
      description: "Kami memahami bahwa setiap perjalanan mental health adalah unik dan membutuhkan pendekatan yang penuh empati."
    },
    {
      icon: Brain,
      title: "Inovasi",
      description: "Menggunakan teknologi AI terdepan untuk memberikan dukungan yang personal dan efektif."
    },
    {
      icon: Shield,
      title: "Privasi",
      description: "Keamanan dan privasi data Anda adalah prioritas utama dalam setiap layanan yang kami berikan."
    },
    {
      icon: Users,
      title: "Komunitas",
      description: "Membangun komunitas yang saling mendukung dan bebas dari stigma tentang kesehatan mental."
    }
  ];

  const team = [
    {
      name: "A thoriq Alqi Ighafur",
      role: "Developer",
      description: "Psikiater dengan 15+ tahun pengalaman dalam terapi kognitif dan kesehatan mental digital.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Kilala Mahadewi",
      role: "AI Technology Lead",
      description: "Ahli AI dan machine learning yang berfokus pada pengembangan teknologi empati buatan.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Naimatul husna",
      role: "Community Manager",
      description: "Psikolog klinis yang memimpin pengembangan program komunitas dan dukungan peer.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Fahri",
      role: "Product Designer",
      description: "UX designer yang mengkhususkan diri dalam desain aplikasi kesehatan mental yang accessible.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Dewi Rahmawati",
      role: "Comunity Manager",
      description: "Psikolog klinis yang memimpin pengembangan program komunitas dan dukungan peer.",
      image: "/api/placeholder/300/300"
    },
     {
      name: "Yusuf Faridz Maulana",
      role: "Product Designer",
      description: "UX designer yang mengkhususkan diri dalam desain aplikasi kesehatan mental yang accessible.",
      image: "/api/placeholder/300/300"
    }
    
  ];

  const stats = [
    { number: "10,000+", label: "Pengguna Aktif" },
    { number: "50,000+", label: "Sesi Curhat" },
    { number: "95%", label: "Tingkat Kepuasan" },
    { number: "24/7", label: "Dukungan AI" }
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
        duration: 0.6
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Tentang MindRelief</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Misi Kami untuk{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kesehatan Mental
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            MindRelief hadir untuk memberikan dukungan kesehatan mental yang accessible, 
            personal, dan efektif melalui teknologi AI yang empati.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Misi Kami
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Kami percaya bahwa setiap orang berhak mendapatkan dukungan kesehatan mental 
                  yang berkualitas. Melalui teknologi AI yang dikembangkan dengan pendekatan 
                  empati, kami ingin menghilangkan stigma dan memberikan akses yang mudah 
                  untuk semua orang.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Memberikan dukungan 24/7 yang dapat diakses kapan saja
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Menciptakan ruang aman tanpa judgment untuk berbagi
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Menghubungkan pengguna dengan komunitas yang suportif
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold mb-2">{stat.number}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Prinsip-prinsip yang memandu setiap langkah dalam mengembangkan MindRelief
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tim Ahli Kami
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Profesional berpengalaman yang berdedikasi untuk kesehatan mental Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

       

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mari Terhubung
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengar dari Anda.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-5 h-5" />
              <span>mindrelief@gmail.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Phone className="w-5 h-5" />
              <span>+62 878 8734 3959</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-5 h-5" />
              <span>Semarang, Indonesia</span>
            </div>
          </div>
          
          <Button
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full"
          >
            Hubungi Kami
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TentangPage;

