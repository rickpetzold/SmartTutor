import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SubmissionsTable() {
  return (
    <section id="database" className="w-full">
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Submissions</h2>
        <Table>
          <TableCaption>Latest submissions (placeholder)</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Price/hr</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Tutor Result</TableHead>
              <TableHead>Student Condition</TableHead>
              <TableHead>Parent Satisfaction</TableHead>
              <TableHead>Experience (yrs)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ENGLISH</TableCell>
              <TableCell>REMOTE</TableCell>
              <TableCell>—</TableCell>
              <TableCell>—</TableCell>
              <TableCell>{/* tutor_academic_result (optional) */}—</TableCell>
              <TableCell>{/* student_condition */}—</TableCell>
              <TableCell>{/* parent_satisfaction (1-5) */}—</TableCell>
              <TableCell>{/* tutoring_experience (>=0) */}—</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </section>
  );
} 