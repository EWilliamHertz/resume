"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Visions", path: "/visions" },
  { name: "Blog", path: "/blog" },
  { name: "Hire Me", path: "/hire" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 p-1.5 rounded-full shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive ? "text-cyan-400" : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}