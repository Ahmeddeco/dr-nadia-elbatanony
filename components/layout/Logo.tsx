import Link from "next/link"
import { Microscope } from "lucide-react"

export default function Logo() {
	return (
		<Link href="/" className="flex items-end gap-1">
			<Microscope className="size-7" color="var(--primary)" />
			<h3 className="tracking-wider leading-none lg:block hidden ">dr.nadia</h3>
		</Link>
	)
}
