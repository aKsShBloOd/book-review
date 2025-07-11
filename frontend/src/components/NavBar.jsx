import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NotebookPen, NotebookText } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useBookStore } from "../store/useBookStore";


function NavBar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { books } = useBookStore();

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* logo */}
          <div className="flex-1 lg:flex-none">
            <Link to={"/"} className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <NotebookText />
                <span className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Book Review
                </span>
              </div>
            </Link>
          </div>
          {/*Right Side */}
          <div className="flex items-center gap-4">
             
            
            <ThemeSelector />

            {isHome && (
              <div className="flex gap-4">
                
                <div className="indicator">
                  <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                    <NotebookText className="size-5" />
                  </div>
                  <span className="badge badge-sm badge-primary indicator-item">
                    {books.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
