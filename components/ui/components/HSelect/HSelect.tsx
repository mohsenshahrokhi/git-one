// import { Fragment, useEffect, useState } from 'react'
// import { Combobox, Transition } from '@headlessui/react'
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
// import { SelectValue } from '@/type'

// export default function HSelect({ options, value, handleStateChange }: { options: SelectValue[], value: SelectValue, handleStateChange: (e: SelectValue) => void }) {
//     // const [selected, setSelected] = useState(people[0])
//     const [query, setQuery] = useState('')
//     const [filtered, setFiltered] = useState<SelectValue[]>()
//     // const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])

//     useEffect(() => {
//         query === '' ? setFiltered(options) : setFiltered(options.filter((person) =>
//             person.name
//                 .toLowerCase()
//                 .replace(/\s+/g, '')
//                 .includes(query.toLowerCase().replace(/\s+/g, ''))
//         ))
//     }, [options, query])

//     return (
//         <div className="flex w-full">
//             <Combobox value={value} onChange={handleStateChange}>
//                 {/* <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple> */}
//                 <div className=" flex w-full relative mt-1">
//                     <div className="relative w-full cursor-default border-2 rounded-md bg-transparent text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">

//                         <Combobox.Input
//                             className="w-full h-12 dark:bg-slate-800 dark:text-slate-200 border-none py-2 pl-3 pr-10 text-lg leading-5 text-gray-900 focus:ring-0"
//                             displayValue={(person: SelectValue) => person.name}
//                             onChange={(event) => setQuery(event.target.value)}
//                         />
//                         <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                             <ChevronUpDownIcon
//                                 className="h-5 w-5 text-gray-400 "
//                                 aria-hidden="true"
//                             />
//                         </Combobox.Button>
//                     </div>
//                     <Transition
//                         as={Fragment}
//                         leave="transition ease-in duration-100"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                         afterLeave={() => setQuery('')}
//                     >
//                         <Combobox.Options className="absolute mt-14 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg z-10 ring-1 ring-black dark:bg-slate-800 ring-opacity-5 focus:outline-none sm:text-sm">
//                             {filtered?.length === 0 && query !== '' ? (
//                                 <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
//                                     Nothing found.
//                                 </div>
//                             ) : (
//                                 filtered?.map((person) => (
//                                     <Combobox.Option
//                                         key={person.id}
//                                         className={({ active }) =>
//                                             `relative cursor-default z-10 dark:bg-slate-800 dark:text-slate-200 select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
//                                             }`
//                                         }
//                                         value={person}
//                                     >
//                                         {({ selected, active }) => (
//                                             <>
//                                                 <span
//                                                     className={`block truncate ${selected ? 'font-medium' : 'font-normal'
//                                                         }`}
//                                                 >
//                                                     {person.name}
//                                                 </span>
//                                                 {selected ? (
//                                                     <span
//                                                         className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
//                                                             }`}
//                                                     >
//                                                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                                                     </span>
//                                                 ) : null}
//                                             </>
//                                         )}
//                                     </Combobox.Option>
//                                 ))
//                             )}
//                         </Combobox.Options>
//                     </Transition>
//                 </div>
//             </Combobox>
//         </div>
//     )
// }
