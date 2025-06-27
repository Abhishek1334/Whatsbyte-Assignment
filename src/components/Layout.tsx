import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.4
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50 focus:z-50"
      >
        Skip to main content
      </a>
      <Header />
      <motion.main
        className="flex-1 px-4 sm:px-6 lg:px-8"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        role="main"
        id="main-content"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
