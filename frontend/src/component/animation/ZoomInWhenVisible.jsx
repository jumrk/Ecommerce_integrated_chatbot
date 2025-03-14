import { motion } from 'framer-motion';

export const ZoomInWhenVisible = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    );
};