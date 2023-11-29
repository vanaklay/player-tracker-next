'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/src/components/ui/button';
import { Checkbox } from '@/src/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { toast } from '@/src/components/ui/use-toast';
import { Player } from '@prisma/client';
import { RemoveConfig } from '@/src/lib/config';
import { deletePlayerOnDatabase } from '@/src/db/players';
import { useState } from 'react';
import { getSortedPlayersByFirstName } from '@/src/utils/players';

const displayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: RemoveConfig.error,
  }),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;

type DeletePlayerFormProps = {
  players: Player[];
};
export function DeletePlayerForm({ players }: DeletePlayerFormProps) {
  const [playersToRemove, setPlayersToRemove] = useState(players);
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
  });

  const deletePlayers = async (players: string[]) => {
    const isDeleted = await deletePlayerOnDatabase(players);
    if (isDeleted) {
      toast({ title: 'Joueurs supprimés avec succès' });
    } else {
      toast({ title: 'Erreur dans la suppression' });
    }
  };

  const onSubmit = async (data: DisplayFormValues) => {
    const players = data.items;
    await deletePlayers(players);
    const restPLayers = playersToRemove.filter(
      (player) => !players.includes(player.id)
    );
    setPlayersToRemove(restPLayers);
  };

  const sortedPlayers = getSortedPlayersByFirstName(playersToRemove);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">{RemoveConfig.label}</FormLabel>
                <FormDescription>{RemoveConfig.description}</FormDescription>
              </div>
              {sortedPlayers.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const items = field.value ? field.value : [];
                              return checked
                                ? field.onChange([...items, item.id])
                                : field.onChange(
                                    field.value?.filter((value) => value !== item.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.firstName} {item.lastName}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Supprimer</Button>
      </form>
    </Form>
  );
}
