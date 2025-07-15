import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ShakeWrapperProps = {
  children: ReactNode;
  shake?: boolean;
};

const ShakeWrapper = ({ children, shake = false }: ShakeWrapperProps) => {
  return (
    <motion.div
      animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default ShakeWrapper;
