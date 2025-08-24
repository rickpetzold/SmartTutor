'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TutoringRecordForm } from "@/components/forms/tutoring-record-form";

export default function Home() {
  // Dummy data for the table
  const records = [
    { id: 1, subject: 'Mathematics', price: 550, location: 'Causeway Bay', satisfaction: 4 },
    { id: 2, subject: 'English', price: 600, location: 'Remote', satisfaction: 5 },
    { id: 3, subject: 'Physics', price: 700, location: 'Mong Kok', satisfaction: 4 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for Price Distribution Chart */}
              <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Price Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Satisfaction vs. Price</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for Satisfaction Chart */}
              <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Satisfaction Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Records</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Record</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Add Tutoring Record</DialogTitle>
                      <DialogDescription>
                        Contribute to the community by sharing anonymous data about a tutoring session.
                      </DialogDescription>
                    </DialogHeader>
                    <TutoringRecordForm />
                  </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Price/hr</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Satisfaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.subject}</TableCell>
                      <TableCell>${record.price}</TableCell>
                      <TableCell>{record.location}</TableCell>
                      <TableCell className="text-right">{record.satisfaction}/5</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
