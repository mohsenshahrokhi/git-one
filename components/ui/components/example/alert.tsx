import React from 'react'

type Props = {}

function alert({ }: Props) {
    return (<>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
            <div className="max-w-7xl mx-auto">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
                        </svg>
                        <div className="space-y-2">
                            <p className="text-slate-800">Learn how to make a glowing gradient background!</p>
                            <a href="https://braydoncoyer.dev/blog/tailwind-gradients-how-to-make-a-glowing-gradient-background" className="block text-indigo-400 group-hover:text-slate-800 transition duration-200" target="_blank">Read Article →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="App">
            <div className="md:flex border m-10">
                <div className="p-2 md:flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                        width="448"
                        height="299"
                        alt="Woman paying for a purchase"
                        className="rounded-lg"
                    />
                </div>
                <div className="mt-4">
                    <div className="uppercase text-sm text-indigo-600 font-bold">
                        MARKETING
                    </div>
                    <a
                        href="google.com"
                        className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
                    >
                        Finding customers for your new business
                    </a>
                    <p className="mt-2 text-gray-900">
                        Getting a new business off the ground is a lot of hard work. Here
                        are five ideas you can use to find your first customers.
                    </p>
                </div>
            </div>
        </div>
    </>

    )
}

export default alert