import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { he } from 'date-fns/locale';

export function Calendar({ range, setRange }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="calendar">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        showOutsideDays
        disabled={{ before: today }}
        formatters={{
          formatCaption: (date) =>
            date.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
          formatWeekdayName: (date) =>
            date.toLocaleString('en-US', { weekday: 'narrow' }),
        }}
      />
    </div>
  )
}
