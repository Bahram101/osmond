import SummaryItem from './SummaryItem'
import { formatCurrency, formatDateTime } from '@/lib/utils/helpers'
import Badge from '@/app/(admin)/admin/components/ui/badge/Badge'
import { VISIT_STATUS_COLOR, VISIT_STATUS_LABEL } from '@/lib/constants/visit'
import { VisitDetail } from '@/types/visit.interface'

type VisitSummaryProps = {
  visit: VisitDetail
}

const VisitSummary = ({ visit }: VisitSummaryProps) => {
  return (

    <div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
      <div className="flex flex-col gap-1">
        <SummaryItem label="Сумма">
          {formatCurrency(visit?.totalAmount)}
        </SummaryItem>

        <SummaryItem label="Оплачено">
          {formatCurrency(visit?.paidAmount)}
        </SummaryItem>

        <SummaryItem label="Долг">
          {formatCurrency(visit?.debtAmount)}
        </SummaryItem>
      </div>
      <div className="flex flex-col gap-1 mt-1 sm:mt-0">
        <SummaryItem label="Статус">
          <Badge
            variant="light"
            color={VISIT_STATUS_COLOR[visit.status]}
          >
            {VISIT_STATUS_LABEL[visit.status]}
          </Badge>
        </SummaryItem>
        <SummaryItem label="Дата">
          {formatDateTime(visit?.createdAt)}
        </SummaryItem>
      </div>
    </div>


  )
}

export default VisitSummary