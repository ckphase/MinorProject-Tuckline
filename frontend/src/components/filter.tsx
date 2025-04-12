import { ReactNode, useTransition, type ComponentProps } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { filterQueryParser } from '@/lib/search-params';
import { Loader2 } from 'lucide-react';
import { useQueryStates } from 'nuqs';

type FilterProps = ComponentProps<typeof Select> & {
  icon?: ReactNode;
  label: string;
  filterKey: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

export const Filter = ({
  icon,
  label,
  filterKey,
  options,
  ...rest
}: FilterProps) => {
  const [isPending, startTransition] = useTransition();
  const [, setFilterQuery] = useQueryStates(filterQueryParser, {
    startTransition,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <Select
      {...rest}
      onValueChange={(value) => {
        setFilterQuery({
          [filterKey]: value,
        });
      }}
    >
      <SelectTrigger className='w-full md:w-max space-x-2'>
        {isPending ? <Loader2 className='animate-spin size-4' /> : icon}
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }, index) => (
          <SelectItem
            key={index}
            value={value}
            className='capitalize'
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
