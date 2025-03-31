import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
function ButtonDelete({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition-colors"
        >
            <FiTrash2 className="w-5 h-5" />
        </button>
    )
}

export default ButtonDelete