'use client';
import { ClipboardEvent, useLayoutEffect, useRef, useState } from 'react';
import { RoomDefinition, buildings } from './places';
import { FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Select, SelectChangeEvent, InputLabel } from '@mui/material';

type Timetable = {
  code: string;
  course: {
      chinese: string;
      english: string;
  };
  credits: number;
  time: {
      day: string;
      time: string;
  }[];
  room: {
    code: string;
    building: RoomDefinition | undefined;
    original: string;
  },
  teacher: ({
      chinese: string;
      english: string;
  })[];
  enrollment: number;
}[]

type ScheduleDataCols = {
  course: Timetable[number],
  dayOfWeek: number, // 0-4
  startTime: number, // 0-12
  endTime: number, // 0-12
  color: string,
}[];

export default function Home() {
  const [scheduleData, setScheduleData] = useState<ScheduleDataCols>([]);
  const [tableDim, setTableDim] = useState({ header: { width: 0, height: 0 }, timetable: { width: 0, height: 0 } });
  const headerRow = useRef<HTMLTableCellElement>(null);
  const timetableCell = useRef<HTMLTableCellElement>(null);
  const [lang, setLang] = useState<'chinese'|'english'>('chinese');
  const [hideTeacher, setHideTeacher] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as any);
  };

  const scheduleTimeSlots = [
    { time: '1', start: '08:00', end: '08:50' },
    { time: '2', start: '09:00', end: '09:50' },
    { time: '3', start: '10:10', end: '11:00' },
    { time: '4', start: '11:10', end: '12:00' },
    { time: 'n', start: '12:10', end: '13:00' },
    { time: '5', start: '13:20', end: '14:10' },
    { time: '6', start: '14:20', end: '15:10' },
    { time: '7', start: '15:30', end: '16:20' },
    { time: '8', start: '16:30', end: '17:20' },
    { time: '9', start: '17:30', end: '18:20' },
    { time: 'a', start: '18:30', end: '19:20' },
    { time: 'b', start: '19:30', end: '20:20' },
    { time: 'c', start: '20:30', end: '21:20' },
  ]

  const parseTime = (time: string) => {
    //time format is DTDTDT.... , where D is the day as M,T,W,R,F,S and time is 1,2,3,4,n,5,6,7,8,9,a,b,c 
    //so we need to split the time into days and times
    //first we split the time into days
    const days = time.match(/.{1,2}/g)?.map(day => ({ day: day[0], time: day[1] }));
    return days as { day: string, time: string }[];
  }

  const parseTeacher = (teachers: string[]) => {
    //odd index is chinese name, even index is english name
    const teacher = teachers.map((teacher, index) => {
      if (index % 2 == 0) {
        return {
          chinese: teacher,
          english: teachers[index + 1]
        }
      }
    }).filter(d => d);
    return teacher as {chinese: string, english: string}[];
  }

  const suitableColors = [
    'bg-blue-400',
    'bg-green-400',
    'bg-lime-400',
    'bg-yellow-400',
    'bg-red-400',
    'bg-pink-400',
    'bg-indigo-400',
    'bg-purple-400',
    'bg-gray-400',
  ]

  const parseToScheduleData = (timetable: Timetable) => {
    const data: ScheduleDataCols = [];
    timetable.forEach(course => {
      //get unique days
      const days = course.time.map(time => time.day).filter((day, index, self) => self.indexOf(day) === index);
      //for each day, get the and check consecutive times as a array
      days.forEach(day => {
        const times = course.time.filter(time => time.day == day).map(time => scheduleTimeSlots.map(m => m.time).indexOf(time.time));
        //get the start and end time
        const startTime = Math.min(...times);
        const endTime = Math.max(...times);
        //get the color
        const color = suitableColors[Math.floor(Math.random() * suitableColors.length)];
        //push to scheduleData
        data.push({
          course: course,
          dayOfWeek: 'MTWRFS'.indexOf(day),
          startTime: startTime,
          endTime: endTime,
          color: color
        });
      })
    })
    setScheduleData(data);
  }

  const parseRoom = (roomStr: string) => {
    // check if the room matches a prefix
    const room = buildings.find(room => roomStr.startsWith(room.prefix));
    if (room) {
      return {
        code: roomStr.slice(room.prefix.length),
        building: room,
        original: roomStr
      }
    } else {
      return {
        code: roomStr,
        building: undefined,
        original: roomStr
      }
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    //read the copied html table
    const clipboardData = e.clipboardData.getData('text/html')
    //parse the html table
    const parser = new DOMParser();
    const htmlTable = parser.parseFromString(clipboardData, 'text/html');
    //get the table element
    const table = htmlTable.querySelector('table');
    if (!table) return;
    //get the table rows
    const rows = table.querySelectorAll('tr');
    //get cells from each row
    const cells = Array.from(rows).map(row => {
      const cells = row.querySelectorAll('td');
      return Array.from(cells).map(cell => cell.innerHTML.split('<br>').map(d => d.replace('&nbsp;', '').trim()).filter(d => d.length > 0));
    });
    const courses = cells.map(cell => {
      return {
        code: cell[0][0],
        course: {
          chinese: cell[1][0],
          english: cell[1][1]
        },
        credits: parseInt(cell[2][0]),
        time: parseTime(cell[3][0]!),
        room: parseRoom(cell[4][0]),
        teacher: parseTeacher(cell[5]),
        enrollment: parseInt(cell[6][0]),
      }
    })
    //log the output
    console.log(courses);
    parseToScheduleData(courses);
  }

  const updateSize = () => {
    setTableDim({
      header: {
        width: headerRow.current?.offsetWidth || 0,
        height: headerRow.current?.offsetHeight || 0
      },
      timetable: {
        width: timetableCell.current?.offsetWidth || 0,
        height: timetableCell.current?.offsetHeight || 0
      }
    })
  }

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => 
      window.removeEventListener("resize", updateSize);
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Start by pasting your courses from&nbsp; 
          <code className="font-mono font-bold">學生選課結果 Course Selection Results</code>
          &nbsp;from CCXP
        </p>
        <div className="fixed bottom-0 left-0 flex h-12 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        
        </div>
      </div>
      <input onPaste={handlePaste} className="w-full max-w-5xl p-4 mt-8 text-center border border-gray-300 rounded-lg dark:border-neutral-700 dark:bg-zinc-800/30 dark:text-white lg:mt-0 lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30" placeholder="Paste Here" />
      <FormGroup>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant='filled' color='primary'>
          <InputLabel id="language">Language</InputLabel>
          <Select
            labelId="language"
            id="lang"
            value={lang}
            label="Language"
            onChange={handleChange}
          >
            <MenuItem value="chinese">中文</MenuItem>
            <MenuItem value="english">Eng</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel control={<Switch defaultChecked />} label="Hide Teachers" value={hideTeacher} onChange={(e,v) => setHideTeacher(v)}/>
      </FormGroup>
      <div className="mb-32 text-center lg:mb-0 w-full">
        {/* Timetable, Relative overlay */}
        <div className="relative w-full">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <td className="w-[40px] min-w-[40px]" ref={headerRow}></td>
                <td className='text-xs w-28'>Mon.</td>
                <td className='text-xs w-28'>Tue.</td>
                <td className='text-xs w-28'>Wed.</td>
                <td className='text-xs w-28'>Thu.</td>
                <td className='text-xs w-28'>Fri.</td>
              </tr>
            </thead>
            <tbody>
              {scheduleTimeSlots.map((time, index) => (
                <tr key={index}>
                  <td className='flex flex-col py-2'>
                    <span className='text-xs text-gray-300'>{time.start}</span>
                    <span className='text-sm font-semibold'>第{time.time}節</span>
                    <span className='text-xs text-gray-300'>{time.end}</span>
                  </td>
                  <td className='border border-gray-800' ref={index == 0 ? timetableCell: undefined}></td>
                  <td className='border border-gray-800'></td>
                  <td className='border border-gray-800'></td>
                  <td className='border border-gray-800'></td>
                  <td className='border border-gray-800'></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='absolute top-0 left-0 w-full h-full'>
            {/* <div 
              className="absolute rounded-md bg-purple-600 shadow-md shadow-purple-600 transform translate-y-0.5" 
              style={{ 
                left: tableDim.header.width, 
                top: tableDim.header.height, 
                width: tableDim.timetable.width-4, 
                height: tableDim.timetable.height 
              }}>
            </div> */}
            {scheduleData.map((data, index) => (
              <div 
                key={index}
                className={`absolute rounded-md shadow-lg transform translate-y-0.5 ${data.color}`}
                style={{ 
                  left: tableDim.header.width + data.dayOfWeek * tableDim.timetable.width, 
                  top: tableDim.header.height + (data.startTime) * tableDim.timetable.height, 
                  width: tableDim.timetable.width - 4, 
                  height: (data.endTime - data.startTime + 1) * tableDim.timetable.height,
                }}>
                <div className='flex flex-col justify-center items-center h-full text-black'>
                  <span className='text-xs lg:text-base font-bold'>{data.course.course[lang]}</span>
                  {/* <span className='text-xs'>{data.course.course.english}</span> */}
                  {!hideTeacher && <span className='text-xs'>{data.course.teacher.map(teacher => teacher[lang]).join(', ')}</span>}
                  <span className='text-xs'>{data.course.room.building? `${data.course.room.building.code[lang]} ${data.course.room.code}`: data.course.room.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
