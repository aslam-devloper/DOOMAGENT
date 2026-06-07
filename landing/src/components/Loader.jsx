import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            className="loader-mark"
            animate={{ rotate: [0, 45, 0], scale: [1, 0.7, 1] }}
            transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
          />
          <div className="loader-text">loading the skills</div>
          <div className="loader-bar" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
