import { TiptapEditor } from "@/components/toolbars/tiptap-editor";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export function ContentFields() {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Beschreibung</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Kurze Beschreibung Ihres Blogbeitrags"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Eine interessante Beschreibung, die die Lesenden motiviert.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inhalt</FormLabel>
            <FormControl>
              <TiptapEditor
                onChange={field.onChange}
                content={field.value as string}
              />
            </FormControl>
            <FormDescription>Der Inhalt des Blogbeitrags.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
