'use client';

import { FormEvent } from 'react';
import Submit from '../../components/Submit';
import { addPlayerOnDatabase } from '../../db/players';
import toast from 'react-hot-toast';
import { InputWithLabel } from '@/src/components/InputWithLabel';

const AddPlayerForm = (): JSX.Element => {
  const addPlayer = async (firstName: string, lastName: string) => {
    const player = await addPlayerOnDatabase(firstName, lastName);
    if (player) {
      toast.success('Présence sauvegarder');
    } else {
      toast.error('Erreur');
    }
  };

  const handleAddForm = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const firstNameInput = form.querySelector("input[id='firstName']");
    const lastNameInput = form.querySelector("input[id='lastName']");

    if (
      !(firstNameInput instanceof HTMLInputElement) ||
      !(lastNameInput instanceof HTMLInputElement) ||
      firstNameInput.value.trim().length === 0 ||
      lastNameInput.value.trim().length === 0
    ) {
      toast.error('Invalid inputs !');
      return;
    }

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;

    await addPlayer(firstName, lastName);

    firstNameInput.value = '';
    lastNameInput.value = '';
  };

  return (
    <>
      <form className="mt-8 flex flex-col space-y-2 px-4" onSubmit={handleAddForm}>
        <InputWithLabel label="Prénom" id="firstName" type="text" />
        <InputWithLabel label="Nom" id="lastName" type="text" />

        <Submit inputValue="Ajouter" size="small" />
      </form>
    </>
  );
};

export default AddPlayerForm;
