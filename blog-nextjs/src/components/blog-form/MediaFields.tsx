import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagInput } from "@/components/ui/tag-input";
import { useFormContext } from "react-hook-form";

export function MediaFields() {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bild-URL</FormLabel>
            <FormControl>
              <Input placeholder="https://beispiel.de/bild.jpg" {...field} />
            </FormControl>
            <FormDescription>
              Leer lassen, um das Standardbild zu verwenden
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Schlagworte</FormLabel>
            <FormControl>
              <TagInput
                maxTags={5}
                tags={field.value}
                onTagsChange={(newTags) => field.onChange(newTags)}
                placeholder="Schlagwort eingeben und Enter drücken..."
              />
            </FormControl>
            <FormDescription>
              Drücken Sie Enter, um ein Schlagwort hinzuzufügen{" "}
              {field.value.length} / 5
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
