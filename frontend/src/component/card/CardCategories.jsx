import React from 'react'
import { motion } from 'framer-motion'

const CardCategories = ({ id, image, name, description }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-square overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {name}
        </h3>
        <p className="text-sm text-gray-600">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default CardCategories