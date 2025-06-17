import { motion } from 'motion/react';

export default function Overlay() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: 'backInOut' }}
            className="w-[375px] h-[175px] rounded bg-black/30 backdrop-blur absolute bottom-[35px] left-[35px] origin-bottom-left overflow-hidden text-white shadow"
        >
            <div className="flex items-center justify-center h-[75%] bg-gray-800">
                <div>
                    <div className="text-2xl">75°</div>
                    <div className="text-lg">Partly Cloudy</div>
                </div>
            </div>
            <div className="flex h-[25%] px-4 items-center justify-between uppercase font-semibold text-xs">
                <div className="flex flex-col gap-1">
                    <h2>Los Angeles</h2>
                    <h2>CA, USA</h2>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <div>Tuesday, May 22</div>
                    <div className="font-[Orbitron]">11:30 PM</div>
                </div>
            </div>
        </motion.div>
    );
}
