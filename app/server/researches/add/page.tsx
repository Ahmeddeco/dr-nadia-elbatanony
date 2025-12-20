import AddResearch from "@/components/forms/AddResearch"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllProfessorsForMultiSelect } from "@/dl/professorData"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function AddResearchPage() {
	await isAdmin()
	const professors = await getAllProfessorsForMultiSelect()
	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"Add research"}
			description={"Add a research to the database."}
			btnTitle={"back"}
			href="/server/researches"
		>
			<AddResearch professors={professors!} />
		</ServerPageCard>
	)
}
