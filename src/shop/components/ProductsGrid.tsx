import { Button } from '@/components/ui/button';
import { Filter, Grid, List, X } from 'lucide-react';
import { ProductCard } from '@/shop/components/productCard';
import { FilterSidebar } from './FilterSidebar';
import { useSearchParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import type { Product } from '@/interfaces/product.interface';

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [areFiltersMounted, setAreFiltersMounted] = useState(false);
  const filtersCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewMode = searchParams.get('viewMode') || 'grid';

  useEffect(() => {
    return () => {
      if (filtersCloseTimeout.current) clearTimeout(filtersCloseTimeout.current);
    };
  }, []);

  const openFilters = () => {
    if (filtersCloseTimeout.current) clearTimeout(filtersCloseTimeout.current);
    setAreFiltersMounted(true);
    requestAnimationFrame(() => setShowFilters(true));
  };

  const closeFilters = () => {
    setShowFilters(false);
    filtersCloseTimeout.current = setTimeout(() => {
      setAreFiltersMounted(false);
      filtersCloseTimeout.current = null;
    }, 250);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    searchParams.set('viewMode', mode);
    setSearchParams(searchParams);
  };

  return (
    <section className="py-12 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-light">Productos</h2>
            <span className="text-muted-foreground">
              ({products.length} productos)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={showFilters ? closeFilters : openFilters}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>

            <div className="hidden md:flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Mobile Filters */}
          {areFiltersMounted && (
            <div className={`fixed inset-0 z-50 flex items-end lg:hidden transition-colors duration-[250ms] ease-out motion-reduce:transition-none ${showFilters ? 'bg-black/40' : 'bg-black/0'}`}>
              <button
                type="button"
                aria-label="Cerrar filtros"
                className="absolute inset-0 cursor-default"
                onClick={closeFilters}
              />
              <div className={`relative w-full max-h-[85dvh] overflow-y-auto overscroll-contain touch-pan-y rounded-t-2xl bg-background shadow-2xl transition-transform duration-[250ms] ease-out motion-reduce:transition-none ${showFilters ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-5 py-4">
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Cerrar filtros"
                    onClick={closeFilters}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-5 pb-8">
                  <FilterSidebar />
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.title}
                  price={product.price}
                  image={product.images[0]}
                  category={product.gender}
                  sizes={product.sizes}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};