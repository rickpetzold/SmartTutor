'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TutoringRecordFormValues, tutoringRecordSchema } from "@/lib/schemas/tutoring-record";
import { z } from "zod";
import type { DefaultValues } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";

const locationDistricts = Object.values(tutoringRecordSchema.shape.location_district.enum);
const subjects = Object.values(tutoringRecordSchema.shape.subject.enum);

export function TutoringRecordForm() {
  const { session } = useAuth();
  
  type FormInput = z.input<typeof tutoringRecordSchema>;
  type FormOutput = TutoringRecordFormValues; // z.output<typeof tutoringRecordSchema>

  const form = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(tutoringRecordSchema),
    defaultValues: {
      price_per_hour: undefined,
      currency: 'HKD',
      subject: undefined,
      location_district: undefined,
      tutor_academic_result: '',
      student_condition: "Normal",
      parent_satisfaction: undefined,
      tutoring_experience: undefined,
    } as DefaultValues<FormInput>,
  });

  async function onSubmit(data: FormOutput) {
    if (!session) {
      alert("You must be authenticated to submit a record.");
      return;
    }
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        alert("Backend URL not configured (NEXT_PUBLIC_BACKEND_URL).");
        return;
      }

      const res = await fetch(`${backendUrl}/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_per_hour: data.price_per_hour,
          currency: data.currency,
          subject: data.subject,
          location_district: data.location_district,
          tutor_academic_result: data.tutor_academic_result || undefined,
          student_condition: data.student_condition,
          parent_satisfaction: data.parent_satisfaction,
          tutoring_experience: data.tutoring_experience,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail || `Request failed (${res.status})`);
      }

      const json = await res.json();
      alert(`Submitted! Record ID: ${json.record_id ?? 'unknown'}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      alert(`Submit failed: ${message}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price_per_hour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Hour</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 500"
                    {...field}
                    value={(field.value as number | string | undefined) ?? ''}
                  />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location_district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location / District</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locationDistricts.map((district) => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
            control={form.control}
            name="student_condition"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Student Condition</FormLabel>
                <FormControl>
                <Input placeholder="e.g., Normal, SEN, etc." {...field} />
                </FormControl>
                <FormDescription>
                Any specific conditions of the student (e.g., SEN).
                </FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="tutor_academic_result"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Tutor's Academic Result (Optional)</FormLabel>
                <FormControl>
                <Textarea
                    placeholder="e.g., A in A-Level Pure Maths, 5** in DSE Chemistry"
                    {...field}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="tutoring_experience"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Tutoring Experience (Years, Optional)</FormLabel>
                    <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 3"
                      {...field}
                      value={(field.value as number | string | undefined) ?? ''}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="parent_satisfaction"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Parent Satisfaction (1-5, Optional)</FormLabel>
                    <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 5"
                      {...field}
                      value={(field.value as number | string | undefined) ?? ''}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <Button type="submit" className="w-full">Submit Record</Button>
      </form>
    </Form>
  );
} 