import { motion } from 'motion/react';

export default function Panel() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'backInOut' }}
            className="w-[350px] h-[600px] bg-background rounded shadow p-4"
        >
            <section className="flex flex-col">
                <h2 className="font-semibold text-sm">Los Angeles, CA, USA</h2>
                <div className="text-xs">Jun 16, 12:30 PM</div>
                <div className="text-4xl mt-2">67°</div>
                <div className="text-xl">Clear</div>
                <div className="text-sm">Feels like 63° F</div>
                <div className="mt-4">
                    <h3 className="font-semibold text-sm">Air Quality Index</h3>
                    <div className="text-sm">Good 43</div>
                </div>
            </section>
        </motion.div>
    );
}
