'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TutoringRecordFormValues, tutoringRecordSchema } from "@/lib/schemas/tutoring-record";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../providers/auth-provider";

export function TutoringRecordForm() {
  const { session } = useAuth();
  
  const form = useForm<TutoringRecordFormValues>({
    resolver: zodResolver(tutoringRecordSchema),
    defaultValues: {
      currency: 'HKD',
      // Add other default values as needed
    },
  });

  async function onSubmit(data: TutoringRecordFormValues) {
    if (!session) {
      alert("You must be authenticated to submit a record.");
      return;
    }
    console.log("Form data submitted:", data);
    // TODO: Implement API call to POST /records
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price_per_hour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Hour</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., HKD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        {/* Other fields will be added here in the same pattern */}

        <Button type="submit" className="w-full">Submit Record</Button>
      </form>
    </Form>
  );
} 