import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  const subtotal = total();
  const gst = Math.round(subtotal * 0.18);
  const finalTotal = subtotal + gst;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-screen flex items-center justify-center">
        <div className="animate-fade-in">
          <ShoppingBag className="w-32 h-32 mx-auto text-muted/30 mb-8" />
          <h2 className="text-4xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start shopping to add items to your cart
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all"
          >
            Browse Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground text-lg mb-8">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.garmentId}-${item.size}`}
                className="flex gap-4 bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all animate-fade-in"
              >
                <Link
                  to={`/product/${item.garmentId}`}
                  className="relative w-32 h-40 flex-shrink-0 bg-muted rounded-xl overflow-hidden"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.garmentId}`}
                    className="font-bold text-lg mb-1 hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  {item.size && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Size: <span className="font-semibold">{item.size}</span>
                    </p>
                  )}
                  <p className="text-2xl font-bold text-primary mb-4">
                    ₹{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border-2 border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.garmentId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.garmentId, item.quantity + 1)}
                        className="px-4 py-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.garmentId)}
                      className="text-destructive hover:text-destructive/80 flex items-center gap-2 font-semibold transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="text-2xl font-bold">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-8 rounded-2xl sticky top-24 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-semibold">₹{gst.toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => alert('🎉 Checkout coming soon! This is a prototype.\n\nIn production, this would integrate with Razorpay for secure payments.')}
                className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all mb-4"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-center text-muted-foreground">
                🔒 Secure checkout with Razorpay
              </p>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-sm text-green-900 dark:text-green-100 font-semibold mb-1">
                  ✨ Free Shipping
                </p>
                <p className="text-xs text-green-800 dark:text-green-200">
                  On all orders above ₹999
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
