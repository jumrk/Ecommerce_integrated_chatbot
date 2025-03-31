import React from 'react'
import { FiEye } from 'react-icons/fi'
function ButtonViewMore({ onClick, text }) {
    return (
        <div>
            <button
                onClick={onClick}
                className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
            >
                <FiEye className="w-4 h-4" />
                {text}
            </button>
        </div>
    )
}

export default ButtonViewMore