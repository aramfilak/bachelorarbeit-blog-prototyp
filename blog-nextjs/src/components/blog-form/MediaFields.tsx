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
import Image from "next/image";
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
            {field.value && (
              // preview image
              <div className="rounded-lg overflow-hidden shadow-md border">
                <Image
                  src={field.value}
                  alt="Bild"
                  className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-300"
                  width={300}
                  height={200}
                  priority
                />
              </div>
            )}
            <FormLabel>Bild-URL</FormLabel>
            <FormControl>
              <Input placeholder="https://beispiel.de/bild.jpg" {...field} />
            </FormControl>
            <FormDescription>
              Verwenden Sie eine Bild-URL, um ein Bild für den Blogbeitrag zu
              verwenden. (Optional)
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
            <FormLabel>Schlagwörter</FormLabel>
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
