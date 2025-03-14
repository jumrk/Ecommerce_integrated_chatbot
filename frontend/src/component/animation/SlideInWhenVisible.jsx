import { motion } from 'framer-motion';

export const SlideInWhenVisible = ({
    children,
    direction = 'left',
    distance = 100,
    delay = 0
}) => {
    const variants = {
        hidden: {
            x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
            y: direction === 'up' ? -distance : direction === 'down' ? distance : 0,
            opacity: 0
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                delay,
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};