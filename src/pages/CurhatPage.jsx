import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, Loader2, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CurhatPage = () => {
  const [curhat, setCurhat] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!curhat.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse('');
    setHasSubmitted(true);

    try {
      const res = await fetch("https://kiieee.app.n8n.cloud/webhook/curhat-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ curhat })
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Respon bukan JSON");
      }

      const data = await res.json();
      console.log("Respon dari N8N:", data);
      setResponse(data.text || "🙏 AI belum memberikan respon.");

    } catch (err) {
      setError("❌ Gagal mendapatkan respon dari server. Silakan coba lagi.");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurhat('');
    setResponse('');
    setError('');
    setHasSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Ruang Aman untuk Berbagi</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            💬 Curhat ke AI
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tulis apa yang kamu rasakan hari ini. AI kami akan merespon dengan empati dan ketenangan.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center space-x-2 mb-6">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Ceritakan Perasaanmu
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Textarea
                  value={curhat}
                  onChange={(e) => setCurhat(e.target.value)}
                  placeholder="Aku merasa..."
                  className="min-h-[200px] resize-none text-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl p-4"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={isLoading || !curhat.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Kirim Curhat
                    </>
                  )}
                </Button>

                {hasSubmitted && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="px-6 py-3 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Response Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Respon AI
              </h2>
            </div>

            <div className="min-h-[200px] flex items-center justify-center">
              {!hasSubmitted ? (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Tulis curhatmu terlebih dahulu...</p>
                </div>
              ) : isLoading ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-600 dark:text-blue-400" />
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    AI sedang memproses perasaanmu...
                  </p>
                </div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg"
                >
                  <p className="text-red-700 dark:text-red-300 text-lg">{error}</p>
                </motion.div>
              ) : response ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full p-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg"
                >
                  <p className="text-green-800 dark:text-green-200 text-lg leading-relaxed whitespace-pre-wrap">
                    {response}
                  </p>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            💡 Tips untuk Curhat yang Efektif
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Ceritakan perasaan Anda dengan jujur dan terbuka
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Jelaskan situasi yang membuat Anda merasa demikian
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Jangan ragu untuk berbagi detail yang penting
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Ingat bahwa ini adalah ruang yang aman dan privat
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CurhatPage;

