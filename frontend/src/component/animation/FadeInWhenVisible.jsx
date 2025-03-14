import { motion } from 'framer-motion';

export const FadeInWhenVisible = ({ children, delay = 0 }) => {
    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay,
                duration: 0.5,
                ease: 'easeInOut'
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