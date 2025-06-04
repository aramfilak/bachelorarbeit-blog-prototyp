import * as React from "react";
import { Menu, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { NavLink } from "react-router";

const navItems = [
  { name: "Blogs", href: "/" },
  { name: "Neuer Blog", href: "/blog/new" },
];

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between w-full py-4 px-4">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" asChild>
          <NavLink to="/">
            <NotebookPen className="size-7" />
          </NavLink>
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "font-medium transition-colors hover:text-primary relative",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                  {
                    "text-primary after:scale-x-100": isActive,
                    "text-muted-foreground": !isActive,
                  }
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-6 text-primary" />
              <span className="sr-only">Menu öffnen</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md relative",
                      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                      {
                        "text-primary after:scale-x-100": isActive,
                        "text-muted-foreground": !isActive,
                      }
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
