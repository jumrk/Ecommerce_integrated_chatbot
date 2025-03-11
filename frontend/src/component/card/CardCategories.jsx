import React from 'react'

function CardCategories({ id, image, name, description }) {
  return (
    <div
      key={id}
      className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 snap-center transition-all duration-300"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
        <img
          src={image}
          alt={name}
          className="w-full h-48 sm:h-56 md:h-64 object-contain bg-transparent"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default CardCategories