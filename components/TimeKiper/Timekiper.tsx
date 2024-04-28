'use state'


import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { TimeClock } from '@mui/x-date-pickers/TimeClock'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { DesktopTimePicker, MobileTimePicker, StaticTimePicker, TimePicker } from '@mui/x-date-pickers'


export default function TimeClockAmPm({ label, time, onChange }: { label: string, time: any, onChange: (part: string, newValue: any) => void }) {
  const [value, setTime] = useState<any>(dayjs('2023-01-01T12:00'))
  useEffect(() => {
    setTime(time)
  }, [time])
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      <DemoContainer
        components={[
          'TimePicker',
        ]}
      >
        <DemoItem >
          <TimePicker
            ampm={false}
            defaultValue={dayjs('2022-04-17T15:30')}
            value={value}
            onChange={(newValue) => onChange('date', newValue)}
          />
        </DemoItem>

      </DemoContainer>
    </LocalizationProvider>
  );
}

{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['TimeClock']}>
    <DemoItem label={label}>
      <TimeClock
        value={value}
        onChange={(newValue) => onChange(newValue)}
        ampm={false} />
    </DemoItem>
  </DemoContainer>
</LocalizationProvider> */}
/* import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import '@/components/TimeKiper/Timekeeper.css'


// import './Timekeeper.css';

export default function ResponsiveTimePickers({
  value,
  handleStateChange,
  title,
  type,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        {type === 'mobile' && (
          <MobileTimePicker
            value={value}
            onChange={(newValue) => {
              handleStateChange(title, newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
        {type === 'desktop' && (
          <DesktopTimePicker
            label={title}
            value={value}
            onChange={(newValue) => {
              handleStateChange(title, newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      </Stack>
    </LocalizationProvider>
  )
}
 */
/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        {type === 'mobile' && (
          <MobileTimePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
        {type === 'desktop' && (
          <DesktopTimePicker
            label={title}
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      </Stack>
    </LocalizationProvider> */

/* import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function TimePickerViewRenderers() {
return (
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['TimePicker']}>
    <TimePicker
      label="With Time Clock"
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
        seconds: renderTimeViewClock,
      }}
    />
  </DemoContainer>
</LocalizationProvider>
);
} */