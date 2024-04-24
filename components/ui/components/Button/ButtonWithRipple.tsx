import React, { ReactNode } from 'react'
import TERipple from '@/components/ui/components/Ripple/Ripple'

type Buttons = {
  color?: string,
  size?: string,
  name: string,
  onClick?: any,
  children: ReactNode

}

const ButtonWithRipple = ({
  color = "",
  name,
  size = 'base',
  children,
  onClick
}: Buttons) => {

  let btnColor = ''

  switch (color) {

    case 'alternative':
      btnColor = 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
      break;
    case 'dark':
      btnColor = 'bg-gray-800 text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
      break;
    case 'light':
      btnColor = 'border-gray-300 bg-gray-300 shadow-md text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 hover:bg-gray-400 focus:ring-gray-200 dark:bg-zinc-500 dark:border-zinc-400 dark:hover:bg-zinc-600 dark:hover:border-gray-600 dark:focus:ring-gray-700'
      break;
    case 'green':
      btnColor = 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
      break;
    case 'red':
      btnColor = 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
      break;
    case 'yellow':
      btnColor = 'bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900'
      break;
    case 'purple':
      btnColor = 'bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
      break;

    default:
      btnColor = 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      break;
  }

  let btnSize = ''

  switch (size) {
    case 'small':
      btnSize = 'px-3 w-full py-2 text-xs font-medium'
      break;
    case 'extraSmall':
      btnSize = 'px-3 w-full py-2 text-sm font-medium'
      break;
    case 'large':
      btnSize = 'px-5 w-full py-3 text-base font-medium'
      break;
    case 'extraLarge':
      btnSize = 'text-base w-full px-6 py-3.5'
      break;

    default:
      btnSize = 'text-sm w-full px-5 py-2.5'
      break;
  }

  return (
    <TERipple rippleColor="light">

      <button
        type="button"
        id={name}
        onClick={onClick}
        name={name}
        className={
          `${btnSize}  
            ${btnColor} 
            w-full justify-center text-lg text-white focus:ring-4 rounded-lg focus:outline-none `
        }
      >
        {children}
      </button>
    </TERipple>

  )
}

export default ButtonWithRipple