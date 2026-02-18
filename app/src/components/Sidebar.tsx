"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";


export const Sidebar = () => {

  return (
    <aside className="w-64 bg-gray-800 text-2xl text-white p-4">
      Sidebar Content
      <nav className="flex flex-col space-y-2 mt-4" >
        <Link href="/" className="hover:bg-gray-700 rounded px-2 py-1">Home</Link>
        <Link href="/dashboard" className="hover:bg-gray-700 rounded px-2 py-1">Dashboard</Link>
        <Link href="/login" className="hover:bg-gray-700 rounded px-2 py-1">Login</Link>

      </nav>
      <div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
