'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from './ui/input';

interface InfoItem {
  key: string;
  value: string;
  contentType?: string;
}

interface InfoTableProps {
  list?: InfoItem[];
}

export const InfoTable = ({ list }: InfoTableProps) => {
  return (
    <div>
      <Table className="border border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="border-r">Key</TableHead>
            <TableHead className="border-r">Value</TableHead>
            <TableHead className="border-r">Content Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list?.map((item) => (
            <TableRow key={item.key}>
              <TableCell className="border-r py-1">
                <Input
                  placeholder="Key"
                  className="rounded-none border-none shadow-none focus-visible:ring-0 h-7 p-0"
                  value={item.key}
                  onChange={(e) => {}}
                />
              </TableCell>
              <TableCell className="border-r py-1">
                <Input
                  placeholder="Value"
                  className="rounded-none border-none shadow-none focus-visible:ring-0 h-7 p-0"
                  value={item.value}
                  onChange={(e) => {}}
                />
              </TableCell>
              <TableCell className="border-r">{item.contentType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
