import { FormEvent } from 'react';
import Submit from '../../components/Submit';
import { addPlayerOnDatabase } from '../../db/players';

const AddForm = (): JSX.Element => {
  const addPlayer = async (firstName: string, lastName: string) => {
    await addPlayerOnDatabase(firstName, lastName);
  };

  const handleAddForm = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const firstNameInput = form.querySelector("input[name='firstName']");
    const lastNameInput = form.querySelector("input[name='lastName']");

    if (
      !(firstNameInput instanceof HTMLInputElement) ||
      !(lastNameInput instanceof HTMLInputElement) ||
      firstNameInput.value.trim().length === 0 ||
      lastNameInput.value.trim().length === 0
    ) {
      alert('Invalid inputs !');
      return;
    }

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;

    console.log(firstName, lastName);
    // await addPlayer(firstName, lastName);

    firstNameInput.value = '';
    lastNameInput.value = '';
  };

  return (
    <form className="mt-8 flex w-4/5 flex-col space-y-2" onSubmit={handleAddForm}>
      <label htmlFor="lastName" className="flex justify-between">
        <span className="mr-4 self-center text-white">Nom :</span>
        <input
          type="text"
          name="lastName"
          className="rounded px-4 py-2 text-black"
        />
      </label>

      <label htmlFor="firstName" className="flex justify-between">
        <span className="mr-4 self-center text-white">Prénom :</span>
        <input
          type="text"
          name="firstName"
          className="rounded px-4 py-2 text-black"
        />
      </label>
      <Submit inputValue="Ajouter" size="small" />
    </form>
  );
};

export default AddForm;
