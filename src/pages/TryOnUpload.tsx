import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Upload, Camera, AlertCircle, CheckCircle, X } from 'lucide-react';
import { mockGarments } from '@/data/mockGarments';

export default function TryOnUpload() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const garmentId = searchParams.get('garmentId');
  const garment = garmentId ? mockGarments.find(g => g.id === garmentId) : null;

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);

    // Validate file type
    if (!selectedFile.type.match(/image\/(jpeg|jpg|png)/)) {
      setError('Please upload a JPG or PNG image');
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file || !garment) return;

    setIsProcessing(true);

    // Simulate processing (mock ML pipeline)
    setTimeout(() => {
      // Create a mock session ID
      const sessionId = `session_${Date.now()}`;
      
      // Store session data in sessionStorage for demo
      sessionStorage.setItem('tryOnSession', JSON.stringify({
        id: sessionId,
        garmentId: garment.id,
        inputImage: preview,
        status: 'PROCESSING',
        createdAt: new Date().toISOString()
      }));

      navigate(`/try-on/result/${sessionId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Virtual Try-On</h1>
          <p className="text-muted-foreground text-lg">
            Upload a full-body photo to see how this garment looks on you
          </p>
        </div>

        {garment && (
          <div className="mb-8 p-4 bg-card border border-border rounded-xl flex items-center gap-4">
            <img
              src={garment.thumbnailUrl}
              alt={garment.name}
              className="w-20 h-28 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">{garment.name}</h3>
              <p className="text-muted-foreground">₹{(garment.discountPrice || garment.price).toLocaleString()}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div>
            <div className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
              preview ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}>
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-96 object-contain rounded-lg mb-4"
                  />
                  <button
                    onClick={() => {
                      setPreview(null);
                      setFile(null);
                      setError(null);
                    }}
                    className="absolute top-2 right-2 p-2 bg-card rounded-full shadow-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold mb-2">Drop your photo here or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">Supports JPG, PNG (max 10MB)</p>
                </>
              )}

              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                className="hidden"
                id="photo-upload"
                disabled={isProcessing}
              />
              <label
                htmlFor="photo-upload"
                className={`inline-block px-8 py-3 bg-primary text-primary-foreground rounded-xl cursor-pointer font-semibold hover:bg-primary/90 transition-colors ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {preview ? 'Change Photo' : 'Upload Photo'}
              </label>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-destructive font-medium">{error}</p>
              </div>
            )}

            {preview && !error && (
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Generate Try-On'
                )}
              </button>
            )}
          </div>

          {/* Tips Sidebar */}
          <div className="space-y-6">
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="w-6 h-6 text-accent" />
                <h3 className="font-bold text-lg">Photo Tips</h3>
              </div>
              <ul className="space-y-3">
                <TipItem
                  icon={<CheckCircle className="w-5 h-5 text-green-600" />}
                  text="Stand in good lighting (avoid shadows)"
                />
                <TipItem
                  icon={<CheckCircle className="w-5 h-5 text-green-600" />}
                  text="Wear fitted clothes (not loose garments)"
                />
                <TipItem
                  icon={<CheckCircle className="w-5 h-5 text-green-600" />}
                  text="Face the camera directly"
                />
                <TipItem
                  icon={<CheckCircle className="w-5 h-5 text-green-600" />}
                  text="Full body visible (head to toe)"
                />
                <TipItem
                  icon={<AlertCircle className="w-5 h-5 text-destructive" />}
                  text="Avoid group photos or mirrors"
                  negative
                />
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">Privacy & Security</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🔒 Your photos are encrypted end-to-end</li>
                <li>⏱️ Automatically deleted after 24 hours</li>
                <li>🚫 Never shared with third parties</li>
                <li>✅ GDPR compliant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TipItem({ icon, text, negative }: { icon: React.ReactNode; text: string; negative?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      {icon}
      <span className={negative ? 'text-muted-foreground' : ''}>{text}</span>
    </li>
  );
}
