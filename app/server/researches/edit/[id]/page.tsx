import EditResearch from "@/components/forms/EditResearch"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllProfessorsForMultiSelect } from "@/dl/professorData"
import { getOneResearch } from "@/dl/researchData"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function EditResearchPage({ params }: { params: Promise<{ id: string }> }) {
	await isAdmin()
	const id = (await params).id
	const research = await getOneResearch(id)
	const professors = await getAllProfessorsForMultiSelect()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit research"}
			description={"edit a research to the database."}
			btnTitle={"back"}
			href="/server/researches"
		>
			<EditResearch professors={professors!} research={research!} />
		</ServerPageCard>
	)
}
