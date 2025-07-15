import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionWrapperProps = {
    children: ReactNode;
    };

    const MotionWrapper = ({ children }: MotionWrapperProps) => {
    return (
        <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
        {children}
        </motion.div>
    );
    };

export default MotionWrapper;
