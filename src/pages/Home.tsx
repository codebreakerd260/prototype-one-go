import { Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { mockGarments } from '@/data/mockGarments';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const featuredGarments = mockGarments.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Try On Ethnic Wear
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mt-2">
                  Virtually
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                AI-powered virtual try-on for sarees, lehengas & more. See how you look before you buy – no returns, just perfection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/try-on"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Try Virtual Try-On
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[500px] lg:h-[600px] animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop"
                alt="Woman in saree"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl animate-scale-in" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Sparkles className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl">10,000+</div>
                    <div className="text-sm text-muted-foreground">Try-Ons Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose VYUGA?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of ethnic wear shopping with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-10 h-10" />}
              title="AI-Powered Try-On"
              description="See exactly how any garment looks on you using advanced AI technology. No more guessing!"
              gradient="from-primary to-primary/70"
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Instant Results"
              description="Get your virtual try-on in under 20 seconds. Fast, accurate, and magical."
              gradient="from-accent to-accent/70"
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10" />}
              title="100% Secure"
              description="Your photos are encrypted and automatically deleted after 24 hours. Complete privacy guaranteed."
              gradient="from-secondary to-secondary/70"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Collection</h2>
              <p className="text-muted-foreground">Handpicked ethnic wear for every occasion</p>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGarments.map((garment) => (
              <ProductCard key={garment.id} garment={garment} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Trusted by Thousands</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatCard number="10,000+" label="Try-Ons Completed" icon={<Sparkles />} />
            <StatCard number="95%" label="Customer Satisfaction" icon={<Star />} />
            <StatCard number="50+" label="Brands Available" icon={<TrendingUp />} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Shopping?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers experiencing the magic of virtual try-on
          </p>
          <Link
            to="/try-on"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
          >
            <Sparkles className="w-6 h-6" />
            Try It Now - It's Free!
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: any) {
  return (
    <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-xl animate-fade-in hover:scale-105">
      <div className={`inline-block p-4 bg-gradient-to-br ${gradient} rounded-2xl mb-6 text-white group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ number, label, icon }: any) {
  return (
    <div className="text-center p-8 rounded-2xl bg-muted/50 hover:bg-muted transition-colors animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary">
        {icon}
      </div>
      <div className="text-5xl font-bold text-primary mb-2">{number}</div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
}
