'use client';

import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type ButtonProps = {
  size?: 'small' | 'large';
} & PropsWithChildren;
export const Button = ({ children, size = 'small' }: ButtonProps) => {
  return (
    <button
      className={clsx('mt-4 self-center rounded border bg-blue-950 p-2', {
        'w-1/2': size === 'small',
        'w-9/12': size === 'large',
      })}
    >
      {children}
    </button>
  );
};
