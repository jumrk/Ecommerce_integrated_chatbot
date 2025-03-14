import { motion } from 'framer-motion';

export const RotateInWhenVisible = ({ children, delay = 0, rotateFrom = -90 }) => {
    const variants = {
        hidden: { opacity: 0, rotate: rotateFrom },
        visible: {
            opacity: 1,
            rotate: 0,
            transition: {
                delay,
                duration: 0.7,
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