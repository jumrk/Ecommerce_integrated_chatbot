import { motion } from 'framer-motion';

export const BlurInWhenVisible = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay }}
        >
            {children}
        </motion.div>
    );
};