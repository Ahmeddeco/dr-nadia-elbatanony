import Logo from "./Logo"
import { socials } from "@/constants/nav"
import Link from "next/link"
import React from "react"
import { Separator } from "../ui/separator"
import { Copyright } from "lucide-react"
import { Badge } from "../ui/badge"

export default function Footer() {
	return (
		<footer className="px-4  min-h-48 h-auto bg-foreground text-background border-t-4 mt-12 border-primary  ">
			<div className="container mx-auto flex flex-col items-center justify-center  gap-8 py-24 ">
				{/* -------------------------------- Logo -------------------------------- */}
				<Logo />
				<h6 className=" text-center text-balance w-sm lg:w-lg">
					25 Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dicta voluptas atque, maxime excepturi
					nihil modi .
				</h6>
				<nav className="flex items-center justify-center gap-8">
					{socials.map(({ href, icon }) => (
						<Link href={href} key={href} target="_blank" className="hover:text-primary ease-in-out duration-500">
							{React.createElement(icon, { size: 24 })}
						</Link>
					))}
				</nav>
				<Separator />
				<Badge>
					<Copyright /> 2025 Ahmed Elgazzar. All rights reserved.
				</Badge>
			</div>
		</footer>
	)
}
