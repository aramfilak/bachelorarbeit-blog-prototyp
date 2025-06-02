"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, NotebookPen } from "lucide-react";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";

const navItems = [
  { name: "Blogs", href: "/" }, // Blogs
  { name: "Neuer Blog", href: "/create-blog" }, // New Blog → Neuer Blog
];

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between w-full py-4 px-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl mr-10">
          <NotebookPen className="size-6" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-6" />
              <span className="sr-only">Menu öffnen</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                    pathname === item.href
                      ? "text-primary font-semibold bg-muted"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
