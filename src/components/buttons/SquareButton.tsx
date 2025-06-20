import { cn } from '@/lib/utils';
import React from 'react';

export default function SquareButton({
    active,
    children,
    ...rest
}: {
    active?: boolean;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={cn(
                'bg-primary-foreground rounded size-8 flex items-center justify-center p-2 hover:bg-accent transition-colors duration-300 ease-in-out cursor-pointer',
                active && 'bg-accent'
            )}
        >
            {children}
        </button>
    );
}
