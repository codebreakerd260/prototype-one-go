import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2, Share2, Download, ShoppingCart, Sparkles, Star } from 'lucide-react';
import { mockGarments } from '@/data/mockGarments';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

export default function TryOnResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    // Simulate processing delay (mock ML pipeline)
    const processingTime = Math.random() * (5000 - 2000) + 2000; // Random delay between 2-5 seconds
    const timer = setTimeout(() => {
      const sessionData = sessionStorage.getItem('tryOnSession');
      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData);
          if (parsed && parsed.id === id) {
            setSession({
              ...parsed,
              status: 'COMPLETED',
              qualityScore: Math.random() * (0.98 - 0.85) + 0.85, // Random quality score
              completedAt: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error("Failed to parse session data:", error);
        }
      }
      setIsLoading(false);
    }, processingTime);

    return () => clearTimeout(timer);
  }, [id]);

  const garment = session ? mockGarments.find(g => g.id === session.garmentId) : null;

  const handleAddToCart = () => {
    if (!garment) return;
    
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addItem({
      garmentId: garment.id,
      name: garment.name,
      imageUrl: garment.thumbnailUrl,
      price: garment.discountPrice || garment.price,
      size: selectedSize
    });

    toast.success('Added to cart!', {
      description: `${garment.name} (Size: ${selectedSize})`,
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart')
      }
    });
  };

  if (isLoading || session?.status !== 'COMPLETED') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-16 h-16 animate-spin text-primary mb-6" />
        <h2 className="text-3xl font-bold mb-3">Creating Your Virtual Try-On...</h2>
        <p className="text-muted-foreground text-lg mb-8">This usually takes 10-20 seconds</p>
        <div className="w-80 h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent animate-pulse w-2/3 rounded-full" />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Processing with AI magic ✨</p>
      </div>
    );
  }

  if (!garment) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Session Not Found</h1>
        <Link to="/try-on" className="text-primary hover:underline">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Result Image */}
          <div className="space-y-4 animate-fade-in">
            <div className="relative aspect-[3/4] bg-muted rounded-2xl overflow-hidden shadow-2xl">
              {/* In a real app, this would be the ML-generated result */}
              {/* For demo, we show a combination of user photo and garment */}
              <img
                src={garment.imageUrl}
                alt="Try-on result"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="font-semibold">AI Generated</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all font-semibold">
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all font-semibold">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>

          {/* Product Details & CTA */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h1 className="text-4xl font-bold mb-4">{garment.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(garment.rating)
                        ? 'fill-secondary text-secondary'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{garment.rating}</span>
              <span className="text-muted-foreground">({garment.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-bold text-primary">
                ₹{(garment.discountPrice || garment.price).toLocaleString()}
              </span>
              {garment.discountPrice && (
                <span className="text-2xl text-muted-foreground line-through">
                  ₹{garment.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Quality Score */}
            {session.qualityScore && (
              <div className="mb-8 p-6 bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800 rounded-2xl animate-scale-in">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-lg text-green-900 dark:text-green-100 mb-1">
                      Excellent Match!
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      This style suits you beautifully with {Math.round(session.qualityScore * 100)}% confidence. Our AI analysis shows this would be a great choice for you!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">Select Size</label>
              <div className="flex flex-wrap gap-3">
                {garment.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-xl font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-4"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Try Another */}
            <Link
              to="/shop"
              className="block w-full py-3 border-2 border-primary text-primary rounded-xl font-semibold text-center hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Try Another Style
            </Link>

            {/* Product Details */}
            <div className="mt-8 space-y-6 border-t border-border pt-8">
              <div>
                <h3 className="font-bold text-lg mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {garment.description}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Details</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="font-semibold min-w-24">Category:</span>
                    <span className="text-muted-foreground">{garment.category.replace('_', ' ')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-semibold min-w-24">Fabric:</span>
                    <span className="text-muted-foreground">{garment.fabricType}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-semibold min-w-24">Occasions:</span>
                    <span className="text-muted-foreground">{garment.occasions.join(', ')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-semibold min-w-24">Colors:</span>
                    <span className="text-muted-foreground">{garment.colors.join(', ')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
