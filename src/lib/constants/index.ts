import { BadgeColor } from "@/app/(admin)/admin/components/ui/badge/Badge";
import { ClientTypes } from "@/types/client.interface";
import { VisitStatus } from "@/types/visit.interface";

export const VISIT_STATUS_LABEL: Record<VisitStatus, string> = {
  OPEN: "Не оплачен",
  PARTIAL: "Частично оплачен",
  PAID: "Оплачен",
};

export const VISIT_STATUS_COLOR: Record<VisitStatus, BadgeColor> = {
  OPEN: "error",
  PARTIAL: "warning",
  PAID: "success",
};

export const CLIENT_TYPE_LABEL: Record<ClientTypes, string> = {
  MASTER: 'Мастер',
  WHOLESALER: 'Оптовик',
  WALK_IN: 'Клиент',
} 