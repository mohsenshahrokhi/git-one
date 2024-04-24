import React from 'react'

type Buttons = {
    color?: string,
    value?: string,
    size?: string,
    icon?: any,
    _id?: string,
    onClick?: any

}

const Button = ({
    color = "",
    value = "",
    size = 'base',
    icon = <></>,
    _id,
    onClick
}: Buttons) => {

    const renderButton = () => {

        let btnColor = ''

        switch (color) {

            case 'alternative':
                btnColor = 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                break;
            case 'dark':
                btnColor = 'bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                break;
            case 'light':
                btnColor = 'border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
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
                btnSize = 'px-3 py-2 text-xs font-medium'
                break;
            case 'extraSmall':
                btnSize = 'px-3 py-2 text-sm font-medium'
                break;
            case 'large':
                btnSize = 'px-5 py-3 text-base font-medium'
                break;
            case 'extraLarge':
                btnSize = 'text-base px-6 py-3.5'
                break;

            default:
                btnSize = 'text-sm px-5 py-2.5'
                break;
        }


        return (<button
            type='button'
            // onClick={() => handleDelete(_id)}
            onClick={() => onClick(_id)}
            id={_id}
            name={_id}
            className={
                `${btnSize}  
                ${btnColor} 
                flex gap-2 text-white focus:ring-4 rounded-lg focus:outline-none `
            }
        >
            {icon}{value}
        </button>)
    }

    return (

        renderButton()

    )
}

export default Button