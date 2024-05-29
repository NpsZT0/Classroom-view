import { useEffect, useState } from "react";

export default function NumberInput({ initNumber, range, setState }: { initNumber?: number, range: number, setState?: any}) {
    const [number, setNumber] = useState(initNumber ?? 1);

    const onIncrease = () => {
        if (number < range) {
            setNumber(number + 1)
        }
    }

    const onDecrease = () => {
        if (number > 1) {
            setNumber(number - 1)
        }
    }
    
    useEffect(() => {
        if (setState) setState(number)
    }, [number])
    return (
            <div className="max-w-xs mx-auto my-2">
                <div className="relative flex items-center justify-center max-w-[8rem]">
                    <button type="button" className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        onClick={onDecrease}>
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                    </button>
                    <div className="px-4 bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {number}
                    </div>
                    <button type="button" id="increment-button" className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        onClick={onIncrease}>
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>
            </div>
    )
}
