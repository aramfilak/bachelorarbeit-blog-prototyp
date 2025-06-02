import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ReadingTimeFields() {
  const { control } = useFormContext();

  return (
    <div className="flex gap-4">
      <FormField
        control={control}
        name="readingTime"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Lesezeit</FormLabel>
            <FormControl>
              <Input type="number" min={1} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="readingTimeUnit"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Zeiteinheit</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Zeiteinheit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minuten</SelectItem>
                  <SelectItem value="hours">Stunden</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
