import AddProfessor from "@/components/forms/AddProfessor"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function AddProfessorPage() {
	await isAdmin()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"Add professor"}
			description={"Add a professor to the database."}
			btnTitle={"back"}
			href="/server/professors"
		>
			<AddProfessor />
		</ServerPageCard>
	)
}
