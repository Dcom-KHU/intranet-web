import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-[60vh] overflow-x-clip">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.key}
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{
            opacity: 1,
            transition: shouldReduceMotion
              ? { duration: 0 }
              : {
                  delay: 0.08,
                  duration: 0.22,
                  ease: [0.4, 0, 0.2, 1],
                },
          }}
          exit={
            shouldReduceMotion
              ? { opacity: 1, transition: { duration: 0 } }
              : {
                  opacity: 0,
                  transition: {
                    duration: 0.18,
                    ease: [0.4, 0, 1, 1],
                  },
                }
          }
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
