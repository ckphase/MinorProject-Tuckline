'use client';

import { useTransition } from 'react';

import { searchQueryParser } from '@/lib/search-params';
import { cn } from '@/lib/utils';
import { Loader2, SearchIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';

import { Input } from './ui/input';

export const SearchInput = ({
  className,
  placeholder = undefined,
}: {
  className?: string;
  placeholder?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [{ q }, setSearchQuery] = useQueryStates(searchQueryParser, {
    startTransition,
    shallow: false,
    throttleMs: 1000,
  });

  const Icon = isPending ? Loader2 : SearchIcon;

  return (
    <div className={cn('relative max-w-md w-full', className)}>
      <Icon
        className={cn(
          'text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2',
          { 'animate-spin': isPending }
        )}
        size={20}
      />
      <Input
        className='pl-8'
        placeholder={placeholder || 'Search...'}
        onChange={(e) => setSearchQuery({ q: e.target.value })}
        value={q}
      />
    </div>
  );
};
