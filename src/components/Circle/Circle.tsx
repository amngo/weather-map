import { motion } from 'motion/react';
import './Circle.css'; // Assuming you have a Circle.css file for styles

export default function Circle() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'backInOut' }}
            className="circle"
        ></motion.div>
    );
}
