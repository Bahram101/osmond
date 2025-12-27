import { BadgeColor } from "@/app/(admin)/admin/components/ui/badge/Badge";
import { VisitStatus } from "@/types/visit.interface";

export const VISIT_STATUS_LABEL: Record<VisitStatus, string> = {
  OPEN: "Открыт",
  PARTIAL: "Частично оплачен",
  PAID: "Оплачен",
};

export const VISIT_STATUS_COLOR: Record<VisitStatus, BadgeColor> = {
  OPEN: "error",
  PARTIAL: "warning",
  PAID: "success",
};
