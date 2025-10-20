import { useState, useMemo } from 'react';
import { useProducts } from '@/api/products';
import ProductCard from '@/components/ProductCard';
import { Filter, Loader2 } from 'lucide-react';

// Hardcoded for now, can be dynamic later
const categories = [
    { id: 'saree', name: 'Sarees', count: 5 },
    { id: 'kurta', name: 'Kurtas', count: 8 },
    { id: 'lehenga', name: 'Lehengas', count: 3 },
    { id: 'sherwani', name: 'Sherwanis', count: 4 },
];

const priceRanges = [
    { id: '0-50', label: 'Under $50', min: 0, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100-200', label: '$100 - $200', min: 100, max: 200 },
    { id: '200-500', label: '$200 - $500', min: 200, max: 500 },
];


export default function Shop() {
  const { data: products, isLoading, isError } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredGarments = useMemo(() => {
    if (!products) return [];
    return products.filter((garment) => {
      // Category filter - Assuming product has a 'category' property
      if (selectedCategory && garment.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (selectedPriceRange) {
        const range = priceRanges.find(r => r.id === selectedPriceRange);
        if (range) {
          const price = parseFloat(garment.price);
          if (price < range.min || price > range.max) {
            return false;
          }
        }
      }

      return true;
    });
  }, [products, selectedCategory, selectedPriceRange]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedPriceRange('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Ethnic Wear</h1>
          <p className="text-muted-foreground">
            Discover our curated collection of traditional Indian clothing
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          {(selectedCategory || selectedPriceRange) && (
            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-semibold">
              Active
            </span>
          )}
        </button>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="sticky top-24 space-y-6">
              {/* Category Filter */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Category</h3>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span>{cat.name}</span>
                        <span className={`text-sm ${selectedCategory === cat.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {cat.count}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Price Range</h3>
                  {selectedPriceRange && (
                    <button
                      onClick={() => setSelectedPriceRange('')}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPriceRange(range.id === selectedPriceRange ? '' : range.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                        selectedPriceRange === range.id
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear All */}
              {(selectedCategory || selectedPriceRange) && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-semibold"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredGarments.length}</span> products
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 animate-spin" />
              </div>
            ) : isError ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">😢</div>
                    <h3 className="text-2xl font-semibold mb-2">Error loading products</h3>
                    <p className="text-muted-foreground">Please try again later.</p>
                </div>
            ) : filteredGarments.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGarments.map((garment) => (
                  <ProductCard key={garment.id} garment={garment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
