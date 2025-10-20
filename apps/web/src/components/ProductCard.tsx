import { Link } from 'react-router-dom';
import { Heart, Sparkles, Star } from 'lucide-react';
import { Garment } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  garment: Garment;
}

export default function ProductCard({ garment }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
      <Link to={`/product/${garment.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={garment.thumbnailUrl}
            alt={garment.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {garment.discountPrice && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold">
              {Math.round(((garment.price - garment.discountPrice) / garment.price) * 100)}% OFF
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4">
              <Link
                to={`/try-on?garmentId=${garment.id}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                Try On
              </Link>
            </div>
          </div>
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-3 right-3 bg-card p-2.5 rounded-full shadow-md hover:scale-110 transition-transform z-10"
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${
            isWishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'
          }`}
        />
      </button>

      {/* Product Info */}
      <Link to={`/product/${garment.id}`} className="block p-4">
        <h3 className="font-semibold text-base mb-1 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {garment.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="text-sm font-medium">{garment.rating}</span>
          <span className="text-xs text-muted-foreground">({garment.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-foreground">
            ₹{garment.discountPrice ? garment.discountPrice.toLocaleString() : garment.price.toLocaleString()}
          </span>
          {garment.discountPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{garment.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex gap-1.5">
          {garment.colors.slice(0, 4).map((color) => (
            <div
              key={color}
              className="w-6 h-6 rounded-full border-2 border-muted"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          {garment.colors.length > 4 && (
            <div className="w-6 h-6 rounded-full border-2 border-muted bg-muted flex items-center justify-center text-xs font-semibold">
              +{garment.colors.length - 4}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
