import { motion } from 'motion/react';

export default function ForecastPanel() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'backInOut' }}
            className="w-[350px] h-[600px] bg-background rounded shadow p-4"
        >
            <section className="flex flex-col">
                <h2 className="font-semibold text-sm">16 Day Forecast</h2>
            </section>
        </motion.div>
    );
}
