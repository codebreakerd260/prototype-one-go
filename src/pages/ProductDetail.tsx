import { useParams, Link } from 'react-router-dom';
import { mockGarments } from '@/data/mockGarments';
import { Star, Sparkles, ShoppingCart, Heart, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const garment = mockGarments.find(g => g.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const addItem = useCartStore(state => state.addItem);

  if (!garment) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-primary hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
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
      description: `${garment.name} (Size: ${selectedSize})`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{garment.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-muted rounded-2xl overflow-hidden">
              <img
                src={garment.imageUrl}
                alt={garment.name}
                className="w-full h-full object-cover"
              />
              {garment.discountPrice && (
                <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-bold">
                  {Math.round(((garment.price - garment.discountPrice) / garment.price) * 100)}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{garment.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
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
              <span className="text-lg font-semibold">{garment.rating}</span>
              <span className="text-muted-foreground">({garment.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl font-bold text-primary">
                ₹{(garment.discountPrice || garment.price).toLocaleString()}
              </span>
              {garment.discountPrice && (
                <span className="text-2xl text-muted-foreground line-through">
                  ₹{garment.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {garment.description}
            </p>

            {/* Size Selection */}
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

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Link
                to={`/try-on?garmentId=${garment.id}`}
                className="flex-1 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Virtual Try-On
              </Link>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-3 mb-8">
              <button className="flex-1 py-3 border-2 border-border rounded-xl hover:border-primary transition-colors flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
              <button className="flex-1 py-3 border-2 border-border rounded-xl hover:border-primary transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-6 border-t border-border pt-8">
              <DetailRow label="Category" value={garment.category.replace('_', ' ')} />
              <DetailRow label="Region" value={garment.region.replace('_', ' ')} />
              <DetailRow label="Fabric" value={garment.fabricType} />
              <DetailRow label="Colors" value={garment.colors.join(', ')} />
              <DetailRow label="Occasions" value={garment.occasions.join(', ')} />
              <DetailRow 
                label="Availability" 
                value={
                  <span className="flex items-center gap-2 text-green-600 font-semibold">
                    <Check className="w-5 h-5" />
                    In Stock
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="font-semibold text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
