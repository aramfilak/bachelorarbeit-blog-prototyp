import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export function AuthorTitleFields() {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Autor</FormLabel>
            <FormControl>
              <Input placeholder="Ihr Name" {...field} />
            </FormControl>
            <FormDescription>Autor des Blogbeitrags.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titel</FormLabel>
            <FormControl>
              <Input placeholder="Blog-Titel" {...field} />
            </FormControl>
            <FormDescription>Interessante Artikelüberschrift </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
