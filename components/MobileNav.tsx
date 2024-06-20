"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-1 pb-10 pl-4"
          >
            <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
            <h1 className="text-24 font-extrabold  text-white-1 ml-2">
              Podcastr
            </h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 text-white-1">
                {sidebarLinks.map(({ route, label, imgURL }) => {
                  const isActive =
                    pathname === route || pathname.startsWith(`${route}/`);

                  return (
                    <SheetClose asChild key={route}>
                      <Link
                        href={route}
                        className={cn(
                          "flex gap-3 items-center py-4 max-lg:px-4 justify-start",
                          {
                            "bg-nav-focus border-r-4 border-orange-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={imgURL}
                          alt={label}
                          width={24}
                          height={24}
                        />
                        <p>{label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
                <div className="flex mt-96">
                  <SignedOut>
                    <div className="flex-center flex-col w-full pb-10 max-lg:px-4 lg:pr-8">
                      <Button
                        asChild
                        className="text-14 w-full bg-orange-1 font-extrabold"
                      >
                        <Link href="/sign-in">Sign in</Link>
                      </Button>
                      <h2 className="text-12 mt-2 font-bold text-white-1">
                        Developed by Dev Mehta!
                      </h2>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex-center flex-col w-full pb-10 max-lg:px-4 lg:pr-8">
                      <Button
                        className="text-14 w-full bg-orange-1 font-extrabold"
                        onClick={() => signOut(() => router.push("/"))}
                      >
                        Log Out
                      </Button>
                      <h2 className="text-12 mt-2 font-bold text-white-1">
                        Developed by Dev Mehta!
                      </h2>
                    </div>
                  </SignedIn>
                </div>
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
