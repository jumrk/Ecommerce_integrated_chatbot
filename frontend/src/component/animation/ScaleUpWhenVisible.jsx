import { motion } from 'framer-motion';

export const ScaleUpWhenVisible = ({ children, delay = 0, scaleFrom = 0.8 }) => {
    const variants = {
        hidden: { opacity: 0, scale: scaleFrom },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay,
                duration: 0.5,
                type: 'spring',
                stiffness: 100
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