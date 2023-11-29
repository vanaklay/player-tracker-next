'use client';

import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type ButtonProps = {
  size?: 'small' | 'large';
} & PropsWithChildren;
const Button = ({ children, size = 'small' }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'mt-4 self-center rounded border bg-secondary p-2 text-secondary-foreground shadow-sm hover:bg-secondary/80',
        {
          'w-1/2': size === 'small',
          'w-9/12': size === 'large',
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
