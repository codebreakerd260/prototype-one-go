import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles, LogOut, User } from 'lucide-react';
import { useUser, useLogout } from '@/api/auth';
import { useCart } from '@/api/cart';
import logo from '@/assets/logo.jpg';

export default function Header() {
  const { data: user } = useUser();
  const { data: cart } = useCart(user);
  const logoutMutation = useLogout();

  const itemCount = cart?.cartItems.reduce((acc, item) => acc + item.quantity, 0) || 0;

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

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm font-medium">Welcome, {user.name}</span>
                <button
                    onClick={() => logoutMutation.mutate()}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    title="Logout"
                >
                    <LogOut className="w-6 h-6 text-foreground" />
                </button>
              </>
            ) : (
                <a
                    href="/api/auth/google"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                    <User className="w-5 h-5" />
                    Login
                </a>
            )}
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
      </div>
    </header>
  );
}
