import { motion } from 'framer-motion';
import React from 'react';

export const SlideGridWhenVisible = ({
    children,
    direction = 'left', // Các hướng có thể là: 'left', 'right', 'up', 'down'
    distance = 50, // Khoảng cách slide
    stagger = 0.1, // Độ trễ giữa các items
    duration = 0.5, // Thời gian animation
    className = '', // Custom className
    once = true // Animation chỉ chạy một lần
}) => {
    // Container variants
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: 0.1,
                ease: "easeOut"
            }
        }
    };

    // Item variants dựa trên direction
    const itemVariants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: duration
            }
        }
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: once,
                margin: "-100px" // Trigger animation sớm hơn một chút
            }}
            variants={containerVariants}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    custom={index}
                    className="h-full" // Đảm bảo chiều cao đồng nhất
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};

// Tạo thêm một số preset variants phổ biến
export const slideVariants = {
    fadeUp: {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: 0.6
            }
        }
    },
    fadeIn: {
        hidden: {
            opacity: 0,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5
            }
        }
    },
    slideInLeft: {
        hidden: {
            opacity: 0,
            x: -100
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: 0.6
            }
        }
    }
};

// Custom hook để dễ dàng sử dụng với các components khác
export const useSlideAnimation = (options = {}) => {
    const {
        direction = 'up',
        distance = 50,
        duration = 0.5,
        delay = 0
    } = options;

    return {
        initial: {
            opacity: 0,
            x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0
        },
        animate: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: "easeOut"
            }
        }
    };
};