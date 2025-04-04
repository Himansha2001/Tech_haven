import { createContext, useContext, useReducer, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterContext = createContext(null);

const initialState = {
  priceRange: {
    min: 0,
    max: 1000000,  // Adjusted for LKR (approximately 5000 USD → 1,000,000 LKR)
  },
  specifications: {},
  compatibility: [],
  sort: 'featured',
  category: 'all',
};

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_PRICE_RANGE':
      return {
        ...state,
        priceRange: action.payload,
      };
    
    case 'SET_SPECIFICATION':
      return {
        ...state,
        specifications: {
          ...state.specifications,
          [action.payload.key]: action.payload.value,
        },
      };
    
    case 'REMOVE_SPECIFICATION':
      const updatedSpecs = { ...state.specifications };
      delete updatedSpecs[action.payload];
      return {
        ...state,
        specifications: updatedSpecs,
      };
    
    case 'CLEAR_SPECIFICATIONS':
      return {
        ...state,
        specifications: {},
      };
      
    case 'SET_COMPATIBILITY':
      return {
        ...state,
        compatibility: action.payload,
      };
      
    case 'ADD_COMPATIBILITY':
      if (state.compatibility.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        compatibility: [...state.compatibility, action.payload],
      };
      
    case 'REMOVE_COMPATIBILITY':
      return {
        ...state,
        compatibility: state.compatibility.filter(item => item !== action.payload),
      };
      
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload,
      };
      
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
      
    case 'RESET_FILTERS':
      return {
        ...initialState,
        category: state.category, // Keep the current category
      };
      
    case 'LOAD_FROM_URL':
      return action.payload;
      
    default:
      return state;
  }
}

export function FilterProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(filterReducer, initialState);
  
  // Load filters from URL when component mounts
  useEffect(() => {
    const filtersFromUrl = {
      ...initialState,
    };
    
    // Parse price range
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      filtersFromUrl.priceRange = {
        min: minPrice ? parseInt(minPrice, 10) : initialState.priceRange.min,
        max: maxPrice ? parseInt(maxPrice, 10) : initialState.priceRange.max,
      };
    }
    
    // Parse specifications
    const specs = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('spec_')) {
        const specKey = key.replace('spec_', '');
        specs[specKey] = value;
      }
    }
    if (Object.keys(specs).length > 0) {
      filtersFromUrl.specifications = specs;
    }
    
    // Parse compatibility
    const compatibility = searchParams.get('compatibility');
    if (compatibility) {
      filtersFromUrl.compatibility = compatibility.split(',');
    }
    
    // Parse sort
    const sort = searchParams.get('sort');
    if (sort) {
      filtersFromUrl.sort = sort;
    }
    
    // Parse category
    const category = searchParams.get('category');
    if (category) {
      filtersFromUrl.category = category;
    }
    
    dispatch({ type: 'LOAD_FROM_URL', payload: filtersFromUrl });
  }, [searchParams]);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Add price range to URL
    if (state.priceRange.min !== initialState.priceRange.min) {
      params.set('minPrice', state.priceRange.min.toString());
    }
    if (state.priceRange.max !== initialState.priceRange.max) {
      params.set('maxPrice', state.priceRange.max.toString());
    }
    
    // Add specifications to URL
    Object.entries(state.specifications).forEach(([key, value]) => {
      params.set(`spec_${key}`, value);
    });
    
    // Add compatibility to URL
    if (state.compatibility.length > 0) {
      params.set('compatibility', state.compatibility.join(','));
    }
    
    // Add sort to URL
    if (state.sort !== initialState.sort) {
      params.set('sort', state.sort);
    }
    
    // Add category to URL
    if (state.category !== initialState.category) {
      params.set('category', state.category);
    }
    
    setSearchParams(params, { replace: true });
  }, [state, setSearchParams]);
  
  // Helper functions to dispatch actions
  const setPriceRange = (range) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: range });
  };
  
  const setSpecification = (key, value) => {
    dispatch({ type: 'SET_SPECIFICATION', payload: { key, value } });
  };
  
  const removeSpecification = (key) => {
    dispatch({ type: 'REMOVE_SPECIFICATION', payload: key });
  };
  
  const clearSpecifications = () => {
    dispatch({ type: 'CLEAR_SPECIFICATIONS' });
  };
  
  const setCompatibility = (compatList) => {
    dispatch({ type: 'SET_COMPATIBILITY', payload: compatList });
  };
  
  const addCompatibility = (item) => {
    dispatch({ type: 'ADD_COMPATIBILITY', payload: item });
  };
  
  const removeCompatibility = (item) => {
    dispatch({ type: 'REMOVE_COMPATIBILITY', payload: item });
  };
  
  const setSort = (sortOption) => {
    dispatch({ type: 'SET_SORT', payload: sortOption });
  };
  
  const setCategory = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };
  
  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };
  
  return (
    <FilterContext.Provider
      value={{
        filters: state,
        setPriceRange,
        setSpecification,
        removeSpecification,
        clearSpecifications,
        setCompatibility,
        addCompatibility,
        removeCompatibility,
        setSort,
        setCategory,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
} 