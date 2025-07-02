import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/lib/utils';

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md',
        className,
      )}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn('overflow-hidden', className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        'data-[selected=true]:bg-gray/15 focus-visible:bg-gray/15 relative cursor-pointer px-16 py-12 text-base outline-hidden data-[disabled=true]:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Command, CommandGroup, CommandItem };
