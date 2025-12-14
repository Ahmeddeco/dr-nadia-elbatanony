"use client"

import { serverNav } from "@/constants/serverNav"
import { SidebarMenu } from "../ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "../ui/button"

export default function ServerNavigation() {
	const pathName = usePathname()

	return (
		<SidebarMenu>
			{serverNav.map(({ href, title }) => (
				<SidebarMenu key={href}>
					<Button asChild variant={pathName === href ? "default" : "ghost"} size={"lg"}>
						<Link href={href}>{title}</Link>
					</Button>
				</SidebarMenu>
			))}
		</SidebarMenu>
	)
}
