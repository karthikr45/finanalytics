import { Download, FileText } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import DocumentUpload from "@/components/portal/document-upload";

const categoryLabels: Record<string, string> = {
  PAN_AADHAAR: "PAN / Aadhaar",
  GST: "GST",
  INCOME_TAX: "Income Tax",
  COMPANY_ROC: "Company / ROC",
  BANK_STATEMENT: "Bank Statement",
  INVOICE: "Invoice",
  OTHER: "Other",
};

export default async function DocumentsPage() {
  const session = await auth();
  const user = session!.user;
  const isStaff = user.role !== "CLIENT";

  const documents = await prisma.document.findMany({
    where: isStaff ? {} : { userId: user.id },
    include: { user: true },
    orderBy: { uploadedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Documents</h1>
        <p className="mt-1 text-sm text-muted">
          {isStaff ? "Documents uploaded by every client." : "Upload and manage your compliance documents."}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload a document</CardTitle>
        </CardHeader>
        <CardContent>
          <DocumentUpload />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                {isStaff && <TableHead>Client</TableHead>}
                <TableHead>Uploaded</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="flex items-center gap-2 font-medium text-ink">
                    <FileText className="h-4 w-4 text-muted" />
                    {doc.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{categoryLabels[doc.category] || doc.category}</Badge>
                  </TableCell>
                  {isStaff && <TableCell className="text-muted">{doc.user.name}</TableCell>}
                  <TableCell className="text-muted">{formatDate(doc.uploadedAt)}</TableCell>
                  <TableCell>
                    <a
                      href={doc.fileUrl}
                      className="flex items-center justify-end gap-1.5 text-xs font-semibold text-emerald hover:text-emerald-light"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>
                  </TableCell>
                </TableRow>
              ))}
              {documents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isStaff ? 5 : 4} className="py-10 text-center text-sm text-muted">
                    No documents uploaded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
