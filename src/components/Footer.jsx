import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Brain, Mail, Phone, MapPin, Github, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Home', path: '/' },
      { name: 'Analisis Mental', path: '/analisis' },
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Curhat AI', path: '/curhat' },
    ],
    support: [
      { name: 'Tentang Kami', path: '/tentang' },
      { name: 'FAQ', path: '#' },
      { name: 'Bantuan', path: '#' },
      { name: 'Kontak', path: '#' },
    ],
    legal: [
      { name: 'Kebijakan Privasi', path: '#' },
      { name: 'Syarat & Ketentuan', path: '#' },
      { name: 'Disclaimer', path: '#' },
      { name: 'Cookie Policy', path: '#' },
    ]
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/thoriqalqi/mindrelief', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MindRelief</span>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Platform kesehatan mental yang didukung AI untuk membantu Anda menemukan ketenangan dan keseimbangan hidup.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">support@mindrelief.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">+62 812-3456-7890</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Jakarta, Indonesia</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Platform Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Support Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Dukungan</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Legal Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-green-400">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              <p className="flex items-center space-x-1">
                <span>© {currentYear} MindRelief. Dibuat dengan</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>untuk kesehatan mental yang lebih baik.</span>
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-gray-800"
        >
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-yellow-900">!</span>
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Disclaimer Penting</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  MindRelief adalah platform dukungan kesehatan mental yang menggunakan AI dan tidak menggantikan 
                  konsultasi profesional dengan psikolog, psikiater, atau tenaga kesehatan mental lainnya. 
                  Jika Anda mengalami krisis mental atau memiliki pikiran untuk menyakiti diri sendiri, 
                  segera hubungi layanan darurat atau profesional kesehatan mental terdekat.
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
                  <span>🏥 Hotline Kesehatan Mental: 119 ext. 8</span>
                  <span>📞 Crisis Center: 021-500-454</span>
                  <span>💬 WhatsApp Konseling: 0811-9-8787-8787</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

