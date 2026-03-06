"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import type { AssessmentResults } from "@/lib/assessment/types";

interface PdfExportButtonProps {
  data: AssessmentResults;
  companyName: string;
  label?: string;
  loadingLabel?: string;
}

export function PdfExportButton({
  data,
  companyName,
  label = "Export PDF",
  loadingLabel = "Generating...",
}: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { AssessmentReport } = await import("./pdf-report");
      const blob = await pdf(
        <AssessmentReport data={data} companyName={companyName} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${companyName.replace(/\s+/g, "-").toLowerCase()}-health-report.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
