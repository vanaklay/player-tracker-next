import { Toaster } from '@/src/components/ui/toaster';
import { findPlayers } from '@/src/db/players';
import { DeletePlayerForm } from '@/src/features/DeletePlayerForm';
import { Player } from '@prisma/client';
import React from 'react';

export async function getServerSideProps() {
  const players = await findPlayers();
  return {
    props: { players },
  };
}

export default function DeletePlayer({ players }: { players: Player[] }) {
  return (
    <>
      <DeletePlayerForm players={players} />
      <Toaster />
    </>
  );
}
