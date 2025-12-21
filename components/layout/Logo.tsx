import Link from "next/link"
import { Microscope } from "lucide-react"

export default function Logo() {
	return (
		<Link href="/" className="flex items-end gap-1">
			<Microscope className="size-8 text-primary" />
			<h2 className="tracking-wider leading-none ">dr.Nadia</h2>
		</Link>
	)
}
