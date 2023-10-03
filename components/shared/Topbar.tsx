import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";

export default function TopBar(){
    return(
        <nav className="topbar">
            <Link rel="stylesheet" href="" className="flex items-center gap-4">
                <Image src="/assets/logo.svg" alt="logo" height={28} width={28}/>
                <p className="text-heading3-bold text-light-1 max-xs:hidden">Outpost</p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image
                                    src="/assets/logout.svg"
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>

                <OrganizationSwitcher 
                    appearance={{
                        elements: {
                            organizationSwitcherTrigger:
                            "py-2 px-4"
                        }
                    }}
                />
            </div>            
        </nav>
    )
}