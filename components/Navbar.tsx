"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "#",
    items: [
      { name: "Consulting", href: "/services/consulting" },
      { name: "Development", href: "/services/development" },
      { name: "Design", href: "/services/design" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    // Implement your logout logic here
    // For example:
    // await fetch('/api/logout', { method: 'POST' })
    // Clear any local storage or cookies
    router.push("/login");
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) =>
                item.items ? (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1 text-lg">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-1 text-sm"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-2 py-1 text-lg"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">ACME Inc</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item, index) =>
              item.items ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger className="flex items-center">
                    {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.items.map((subItem, subIndex) => (
                      <DropdownMenuItem key={subIndex} asChild>
                        <Link href={subItem.href}>{subItem.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    "text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other elements here if needed */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 rounded-full"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
