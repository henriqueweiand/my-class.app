import { motion } from "framer-motion";

interface ScrollAnimationWrapperProps {
  children: any;
  className: any;
};

export default function ScrollAnimationWrapper({ children, className, ...props }: ScrollAnimationWrapperProps) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}