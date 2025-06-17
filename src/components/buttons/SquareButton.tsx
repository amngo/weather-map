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
            className={`bg-background rounded size-8 flex items-center justify-center p-2 hover:bg-gray-100 transition-colors duration-300 ease-in-out cursor-pointer ${
                active ? 'bg-gray-200' : ''
            }`}
        >
            {children}
        </button>
    );
}
