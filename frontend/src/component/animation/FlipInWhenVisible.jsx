import { motion } from 'framer-motion';

export const FlipInWhenVisible = ({
    children,
    axis = 'x',
    delay = 0
}) => {
    const variants = {
        hidden: {
            opacity: 0,
            rotateX: axis === 'x' ? 90 : 0,
            rotateY: axis === 'y' ? 90 : 0
        },
        visible: {
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            transition: {
                delay,
                duration: 0.6,
                type: 'spring',
                stiffness: 80
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={variants}
            style={{ transformStyle: 'preserve-3d' }} // Đảm bảo lật 3D
        >
            {children}
        </motion.div>
    );
};