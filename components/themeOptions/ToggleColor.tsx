'use client'

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { SetSidebarVisible, SetSidebarControl, SetColor } from "@/slices/ThemeSlice"

import { useState } from "react";

const ToggleSidebar: () => JSX.Element = () => {

    const dispatch = useAppDispatch()

    const [open, SetOpen] = useState(false)

    const { color } = useAppSelector((state) => state.themeMode.theme)

    const toggleSidebar = () => {

        dispatch(SetSidebarVisible())

        dispatch(SetSidebarControl(false))

    }

    const colors = [
        'slate',
        'gray', 'zinc', 'neutral', 'stone', 'blue', 'purple', 'rose'
    ]

    return (
        <div
            // x-data="{ isOpen: true }" 

            className="relative inline-block ">
            {/* <!-- Dropdown toggle button --> */}
            <button
                // @click="isOpen = !isOpen" 
                onClick={() => SetOpen(!open)}
                className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            {open && (<div
                className={`absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-${color} rounded-md shadow-xl dark:bg-${color}-800 overflow-y-auto overflow-hidden`}
            >
                {colors?.map((col, index) =>
                (<span
                    key={index}
                    className={`flex cursor-pointer justify-center mb-2 border-b items-center px-3 py-3 text-sm text-${col}-600 capitalize transition-colors duration-300 transform dark:text-${col}-300 hover:bg-${col}-100 dark:hover:bg-${col}-700 dark:hover:text-${col}-200`}>

                    <span
                        onClick={() => dispatch(SetColor(col))}
                        className={`mx-1 text-${col}-200`}>
                        {col}
                    </span>
                </span>)
                )}

            </div>)}
        </div>
    )

}

export default ToggleSidebar