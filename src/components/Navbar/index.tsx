'use client';
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const links = [
    {
      text: 'Accueil',
      url: '/',
    },
    {
      text: 'Ajouter',
      url: '/addPlayer',
    },
    {
      text: 'Télécharger',
      url: '/pdf',
    },
  ];
  return (
    <div className="mb-4 flex flex-col items-center justify-start gap-y-4 px-2">
      <ul className="flex gap-4 pb-2">
        {links.map((link) => (
          <li
            className="hover:text-blue-500"
            key={`${Math.random() + 1}_${link.text}`}
          >
            <Link href={link.url}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
