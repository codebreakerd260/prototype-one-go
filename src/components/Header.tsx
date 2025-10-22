import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import logo from '@/assets/logo.jpg';

export default function Header() {
  const itemCount = useCartStore(state => state.itemCount());

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="VYUGA" className="h-12 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/shop" 
              className="text-foreground hover:text-primary font-medium transition-colors relative group"
            >
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link 
              to="/try-on" 
              className="text-foreground hover:text-primary font-medium transition-colors relative group flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Virtual Try-On
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary font-medium transition-colors relative group"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          </nav>

          {/* Cart */}
          <Link 
            to="/cart" 
            className="relative p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-scale-in">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
