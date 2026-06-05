import { useNavigate } from 'react-router-dom'
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@chghealthcare/unified-design-system'
import { READOUT_MONTHS } from './readout-months'
import type { ReadoutMonthId } from './types'

type Props = {
  value: ReadoutMonthId
}

export function ReadoutMonthSelect({ value }: Props) {
  const navigate = useNavigate()

  return (
    <div className="w-auto shrink-0">
      <Label htmlFor="readout-month-select" className="sr-only">
        Readout month
      </Label>
      <Select
        value={value}
        onValueChange={(next) => {
          const month = READOUT_MONTHS.find((entry) => entry.id === next)
          if (month) navigate(month.route)
        }}
      >
        <SelectTrigger
          id="readout-month-select"
          inputSize="sm"
          className="w-auto min-w-[9.5rem] shadow-none"
          aria-label="Select readout month"
        >
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent position="popper" align="end" className="min-w-[var(--radix-select-trigger-width)]">
          {READOUT_MONTHS.map((month) => (
            <SelectItem key={month.id} value={month.id}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
