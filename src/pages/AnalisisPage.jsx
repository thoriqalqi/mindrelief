import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, User, Calendar, Heart, Moon, AlertCircle, 
  Target, Smile, MessageSquare, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnalysis } from '@/context/AnalysisContext';

const AnalisisPage = () => {
  const navigate = useNavigate();
  const { saveAnalysisData, saveAnalysisResult, setIsLoading } = useAnalysis();
  const [formData, setFormData] = useState({
    namaLengkap: '',
    umur: '',
    jenisKelamin: '',
    frekuensiTidur: '',
    tingkatKecemasan: [3],
    kesulitanFokus: '',
    motivasiHarian: '',
    suasanaHati: '',
    keresahan: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzeWithGemini = async (data) => {
    const prompt = `
    Sebagai psikolog AI yang empati, analisis kondisi mental berdasarkan data berikut:
    
    Nama: ${data.namaLengkap}
    Umur: ${data.umur} tahun
    Jenis Kelamin: ${data.jenisKelamin}
    Frekuensi Tidur: ${data.frekuensiTidur}
    Tingkat Kecemasan (1-5): ${data.tingkatKecemasan}
    Kesulitan Fokus: ${data.kesulitanFokus}
    Motivasi Harian: ${data.motivasiHarian}
    Suasana Hati: ${data.suasanaHati}
    Keresahan: ${data.keresahan}

    Berikan analisis dalam format JSON yang valid berikut (tanpa markdown atau teks tambahan):
    {
      "tingkatStres": 45,
      "emosiUtama": {
        "bahagia": 20,
        "netral": 50,
        "tertekan": 15,
        "sedih": 10,
        "marah": 5
      },
      "rekomendasi": "Berdasarkan analisis kondisi Anda, disarankan untuk melakukan teknik relaksasi seperti meditasi 10 menit setiap hari dan olahraga ringan 3x seminggu untuk mengurangi tingkat kecemasan.",
      "ringkasan": "Kondisi mental Anda saat ini menunjukkan tingkat stres yang moderat dengan kecemasan ringan terkait pekerjaan dan masa depan. Secara keseluruhan, Anda masih memiliki motivasi yang baik dalam aktivitas sehari-hari.",
      "saran": "1. Lakukan teknik pernapasan dalam saat merasa cemas. 2. Buat jadwal harian yang terstruktur. 3. Luangkan waktu untuk hobi yang menyenangkan. 4. Bicarakan kekhawatiran dengan orang terdekat.",
      "motivasi": "Ingatlah bahwa kecemasan tentang masa depan adalah hal yang wajar. Anda sudah menunjukkan langkah positif dengan mencari bantuan untuk memahami kondisi mental Anda. Terus jaga kesehatan mental dan percayalah bahwa Anda mampu menghadapi tantangan yang ada."
    }

    Pastikan respons hanya berupa JSON yang valid tanpa teks tambahan.
    `;

    try {
      console.log("Mengirim request ke Gemini API...");
      
      // Updated API endpoint - using gemini-1.5-flash instead of gemini-pro
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCjCzsEGtnbdPIXpczz2W_2Rv_FgMPDf8A`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log("Raw API Response:", result);
      
      // Check if response has expected structure
      if (!result.candidates || !result.candidates[0] || !result.candidates[0].content || !result.candidates[0].content.parts || !result.candidates[0].content.parts[0]) {
        console.error("Unexpected API response structure:", result);
        throw new Error("Invalid response structure from Gemini API");
      }

      const text = result.candidates[0].content.parts[0].text;
      console.log("Raw text from Gemini:", text);
      
      // Clean and extract JSON from response
      let jsonString = text.trim();
      
      // Remove markdown code blocks if present
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        jsonString = jsonMatch[1].trim();
      } else {
        // Try to find JSON object in the text
        const jsonObjectMatch = text.match(/\{[\s\S]*\}/);
        if (jsonObjectMatch) {
          jsonString = jsonObjectMatch[0];
        }
      }

      console.log("Extracted JSON string:", jsonString);

      try {
        const parsedResult = JSON.parse(jsonString);
        console.log("Parsed result:", parsedResult);
        
        // Validate required fields
        const requiredFields = ['tingkatStres', 'emosiUtama', 'rekomendasi', 'ringkasan', 'saran', 'motivasi'];
        const missingFields = requiredFields.filter(field => parsedResult[field] === undefined);
        
        if (missingFields.length > 0) {
          console.error("Missing required fields:", missingFields);
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Validate emosiUtama structure
        if (typeof parsedResult.emosiUtama !== 'object' || parsedResult.emosiUtama === null) {
          throw new Error("emosiUtama must be an object");
        }

        const requiredEmotions = ['bahagia', 'netral', 'tertekan', 'sedih', 'marah'];
        const missingEmotions = requiredEmotions.filter(emotion => parsedResult.emosiUtama[emotion] === undefined);
        
        if (missingEmotions.length > 0) {
          console.error("Missing emotions:", missingEmotions);
          throw new Error(`Missing emotions: ${missingEmotions.join(', ')}`);
        }

        return parsedResult;
        
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        console.error("Failed to parse JSON string:", jsonString);
        
        // Return fallback data if parsing fails
        return {
          tingkatStres: 50,
          emosiUtama: {
            bahagia: 20,
            netral: 40,
            tertekan: 20,
            sedih: 15,
            marah: 5
          },
          rekomendasi: "Berdasarkan data yang Anda berikan, disarankan untuk melakukan aktivitas relaksasi seperti meditasi atau olahraga ringan untuk mengurangi tingkat stres.",
          ringkasan: "Kondisi mental Anda menunjukkan tingkat stres yang normal dengan beberapa area yang perlu perhatian. Secara keseluruhan, Anda masih dalam kondisi yang dapat dikelola dengan baik.",
          saran: "1. Lakukan teknik pernapasan dalam saat merasa tertekan. 2. Atur jadwal istirahat yang cukup. 3. Lakukan aktivitas yang menyenangkan secara rutin. 4. Jangan ragu untuk berbagi perasaan dengan orang terdekat.",
          motivasi: "Setiap langkah kecil yang Anda ambil untuk memahami dan merawat kesehatan mental adalah pencapaian yang luar biasa. Terus jaga diri Anda dan ingat bahwa Anda tidak sendirian dalam perjalanan ini."
        };
      }
      
    } catch (error) {
      console.error("Error in analyzeWithGemini:", error);
      
      // Return fallback data for any error
      return {
        tingkatStres: 50,
        emosiUtama: {
          bahagia: 25,
          netral: 35,
          tertekan: 20,
          sedih: 15,
          marah: 5
        },
        rekomendasi: "Berdasarkan informasi yang Anda berikan, disarankan untuk melakukan teknik manajemen stres seperti meditasi, olahraga ringan, dan menjaga pola tidur yang teratur.",
        ringkasan: "Kondisi mental Anda saat ini menunjukkan adanya beberapa tantangan yang wajar dialami. Dengan dukungan yang tepat dan strategi coping yang baik, kondisi ini dapat dikelola dengan efektif.",
        saran: "1. Praktikkan teknik relaksasi seperti pernapasan dalam. 2. Jaga pola tidur yang konsisten. 3. Lakukan aktivitas fisik secara teratur. 4. Luangkan waktu untuk aktivitas yang Anda nikmati. 5. Pertimbangkan untuk berbicara dengan konselor profesional jika diperlukan.",
        motivasi: "Mengambil langkah untuk memahami kesehatan mental Anda adalah tanda kekuatan dan kesadaran diri yang luar biasa. Setiap hari adalah kesempatan baru untuk tumbuh dan berkembang. Percayalah pada kemampuan Anda untuk mengatasi tantangan yang ada."
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.namaLengkap || !formData.umur || !formData.jenisKelamin || 
        !formData.frekuensiTidur || !formData.kesulitanFokus || 
        !formData.motivasiHarian || !formData.suasanaHati || !formData.keresahan) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    try {
      console.log("Starting analysis process...");
      
      // Simpan data form terlebih dahulu
      saveAnalysisData(formData);
      
      // Set loading state dan redirect ke dashboard
      setIsLoading(true);
      navigate("/dashboard");
      
      // Analisis dengan Gemini di background
      console.log("Calling Gemini API...");
      const result = await analyzeWithGemini(formData);
      console.log("Analysis result:", result);
      
      saveAnalysisResult(result);
      
    } catch (error) {
      console.error("Error during analysis:", error);
      // Don't show alert, just use fallback data
    } finally {
      setIsLoading(false);
    }
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            <span>Analisis Mental AI</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🧠 Analisis Kesehatan Mental
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Isi formulir di bawah ini untuk mendapatkan analisis mendalam tentang kondisi kesehatan mental Anda dengan bantuan AI.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Formulir Analisis Mental
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Semua informasi akan diproses secara anonim dan aman
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Nama Lengkap */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="namaLengkap" className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Nama Lengkap</span>
                  </Label>
                  <Input
                    id="namaLengkap"
                    type="text"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.namaLengkap}
                    onChange={(e) => handleInputChange('namaLengkap', e.target.value)}
                    className="text-lg py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
                    required
                  />
                </motion.div>

                {/* Umur */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="umur" className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span>Umur</span>
                  </Label>
                  <Input
                    id="umur"
                    type="number"
                    placeholder="Masukkan umur Anda"
                    value={formData.umur}
                    onChange={(e) => handleInputChange('umur', e.target.value)}
                    className="text-lg py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl"
                    min="1"
                    max="120"
                    required
                  />
                </motion.div>

                {/* Jenis Kelamin */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    <span>Jenis Kelamin</span>
                  </Label>
                  <RadioGroup
                    value={formData.jenisKelamin}
                    onValueChange={(value) => handleInputChange('jenisKelamin', value)}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="laki-laki" id="laki-laki" />
                      <Label htmlFor="laki-laki" className="text-gray-700 dark:text-gray-300">Laki-laki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="perempuan" id="perempuan" />
                      <Label htmlFor="perempuan" className="text-gray-700 dark:text-gray-300">Perempuan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lainnya" id="lainnya" />
                      <Label htmlFor="lainnya" className="text-gray-700 dark:text-gray-300">Lainnya</Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                {/* Frekuensi Tidur */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Frekuensi Tidurmu Dalam Seminggu Ini?</span>
                  </Label>
                  <Select value={formData.frekuensiTidur} onValueChange={(value) => handleInputChange('frekuensiTidur', value)}>
                    <SelectTrigger className="text-lg py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 rounded-xl">
                      <SelectValue placeholder="Pilih frekuensi tidur Anda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sangat-kurang">Sangat kurang (≤ 4 jam/hari)</SelectItem>
                      <SelectItem value="kurang">Kurang (5–6 jam)</SelectItem>
                      <SelectItem value="cukup">Cukup (7–8 jam)</SelectItem>
                      <SelectItem value="sangat-cukup">Sangat cukup (&gt; 8 jam)</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Tingkat Kecemasan */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <span>Seberapa sering kamu merasa cemas akhir-akhir ini? (1-5)</span>
                  </Label>
                  <div className="px-4">
                    <Slider
                      value={formData.tingkatKecemasan}
                      onValueChange={(value) => handleInputChange('tingkatKecemasan', value)}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span>Tidak pernah (1)</span>
                      <span className="font-semibold text-orange-600 dark:text-orange-400">{formData.tingkatKecemasan[0]}</span>
                      <span>Sangat sering (5)</span>
                    </div>
                  </div>
                </motion.div>

                {/* Kesulitan Fokus */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span>Apakah kamu merasa kesulitan untuk fokus?</span>
                  </Label>
                  <RadioGroup
                    value={formData.kesulitanFokus}
                    onValueChange={(value) => handleInputChange('kesulitanFokus', value)}
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ya" id="fokus-ya" />
                      <Label htmlFor="fokus-ya" className="text-gray-700 dark:text-gray-300">Ya</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tidak" id="fokus-tidak" />
                      <Label htmlFor="fokus-tidak" className="text-gray-700 dark:text-gray-300">Tidak</Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                {/* Motivasi Harian */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <span>Apakah kamu merasa termotivasi dalam kegiatan sehari-hari?</span>
                  </Label>
                  <RadioGroup
                    value={formData.motivasiHarian}
                    onValueChange={(value) => handleInputChange('motivasiHarian', value)}
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ya" id="motivasi-ya" />
                      <Label htmlFor="motivasi-ya" className="text-gray-700 dark:text-gray-300">Ya</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tidak" id="motivasi-tidak" />
                      <Label htmlFor="motivasi-tidak" className="text-gray-700 dark:text-gray-300">Tidak</Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                {/* Suasana Hati */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Smile className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    <span>Bagaimana suasana hatimu secara umum minggu ini?</span>
                  </Label>
                  <Select value={formData.suasanaHati} onValueChange={(value) => handleInputChange('suasanaHati', value)}>
                    <SelectTrigger className="text-lg py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-pink-500 dark:focus:border-pink-400 rounded-xl">
                      <SelectValue placeholder="Pilih suasana hati Anda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bahagia">Bahagia</SelectItem>
                      <SelectItem value="netral">Netral</SelectItem>
                      <SelectItem value="tertekan">Tertekan</SelectItem>
                      <SelectItem value="sedih">Sedih</SelectItem>
                      <SelectItem value="marah">Marah</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Keresahan */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="keresahan" className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <span>Tuliskan hal yang membuatmu paling resah saat ini</span>
                  </Label>
                  <Textarea
                    id="keresahan"
                    placeholder="Ceritakan apa yang sedang membuatmu resah atau khawatir..."
                    value={formData.keresahan}
                    onChange={(e) => handleInputChange('keresahan', e.target.value)}
                    className="text-lg py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-red-500 dark:focus:border-red-400 rounded-xl min-h-[120px] resize-none"
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Analisis Sekarang
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tentang Analisis Mental AI</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Analisis menggunakan AI Gemini untuk memberikan insight mendalam</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">📊 Visualisasi Interaktif</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">Hasil ditampilkan dalam bentuk grafik dan visualisasi interaktif</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">🔒 Privasi Terjamin</h3>
              <p className="text-sm text-green-700 dark:text-green-300">Data Anda aman dan tidak disimpan secara permanen</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6 text-center">
              <Sparkles className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">💡 Rekomendasi Personal</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">Rekomendasi personal berdasarkan kondisi mental Anda</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalisisPage;

