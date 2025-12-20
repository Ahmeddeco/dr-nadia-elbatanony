import EditProfessor from "@/components/forms/EditProfessor"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getOneProfessor } from "@/dl/professorData"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function EditProfessorPage({ params }: { params: Promise<{ id: string }> }) {
	await isAdmin()
	const id = (await params).id

	const professor = await getOneProfessor(id)
	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit professor"}
			description={"edit a professor to the database."}
			btnTitle={"back"}
			href="/server/students"
		>
			<EditProfessor professor={professor!} />
		</ServerPageCard>
	)
}
