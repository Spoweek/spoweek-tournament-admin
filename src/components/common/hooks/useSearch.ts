import { useState, useMemo, useCallback } from 'react';

export interface SearchableItem {
  label: string;
  searchTerms?: string[];
  [key: string]: any;
}

export interface UseSearchOptions<T extends SearchableItem> {
  items: T[];
  searchKeys?: (keyof T)[];
  initialQuery?: string;
}

export interface UseSearchReturn<T extends SearchableItem> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredItems: T[];
  clearSearch: () => void;
}

export const useSearch = <T extends SearchableItem>({
  items,
  searchKeys = ['label'],
  initialQuery = '',
}: UseSearchOptions<T>): UseSearchReturn<T> => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return items.filter(item => {
      // Search in specified keys
      for (const key of searchKeys) {
        const value = item[key];
        if (typeof value === 'string' && value.toLowerCase().includes(query)) {
          return true;
        }
      }
      
      // Search in additional search terms
      if (item.searchTerms) {
        return item.searchTerms.some(term => 
          term.toLowerCase().includes(query)
        );
      }
      
      return false;
    });
  }, [items, searchQuery, searchKeys]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    clearSearch,
  };
};
