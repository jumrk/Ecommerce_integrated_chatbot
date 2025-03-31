import React from 'react'
import { FiEdit2 } from 'react-icons/fi'

function ButtonEdit({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors"
        >
            <FiEdit2 className="w-5 h-5" />
        </button>
    )
}

export default ButtonEdit