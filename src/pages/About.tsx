import { Sparkles, Upload, Zap, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">How Virtual Try-On Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the magic of AI-powered virtual try-on in just 3 simple steps
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-24">
            <Step
              number="01"
              title="Browse & Select"
              description="Explore our curated collection of ethnic wear. From elegant sarees to stunning lehengas, find the perfect piece that catches your eye."
              icon={<Sparkles className="w-12 h-12" />}
              gradient="from-primary to-primary/70"
              image="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=400&fit=crop"
            />

            <Step
              number="02"
              title="Upload Your Photo"
              description="Take or upload a full-body photo following our simple guidelines. Our AI needs a clear view to work its magic!"
              icon={<Upload className="w-12 h-12" />}
              gradient="from-accent to-accent/70"
              image="https://images.unsplash.com/photo-1583391733981-5ade28e96d6f?w=600&h=400&fit=crop"
              reverse
            />

            <Step
              number="03"
              title="See the Magic"
              description="In under 20 seconds, our AI generates a realistic visualization of how the garment looks on you. No guesswork, just confidence!"
              icon={<Zap className="w-12 h-12" />}
              gradient="from-secondary to-secondary/70"
              image="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop"
            />

            <Step
              number="04"
              title="Shop with Confidence"
              description="Love what you see? Add it to cart and complete your purchase. Our virtual try-on reduces returns by 50%!"
              icon={<ShoppingCart className="w-12 h-12" />}
              gradient="from-primary to-accent"
              image="https://images.unsplash.com/photo-1598984616039-32bcec47d290?w=600&h=400&fit=crop"
              reverse
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Try It Yourself?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of ethnic wear shopping today
          </p>
          <Link
            to="/try-on"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
          >
            <Sparkles className="w-6 h-6" />
            Start Virtual Try-On
          </Link>
        </div>
      </section>
    </div>
  );
}

function Step({ number, title, description, icon, gradient, image, reverse }: any) {
  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? 'md:grid-flow-dense' : ''}`}>
      <div className={reverse ? 'md:col-start-2' : ''}>
        <div className={`inline-block p-4 bg-gradient-to-br ${gradient} rounded-2xl mb-6 text-white`}>
          {icon}
        </div>
        <div className="text-6xl font-bold text-muted/20 mb-4">{number}</div>
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className={reverse ? 'md:col-start-1 md:row-start-1' : ''}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
