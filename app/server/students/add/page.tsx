import AddStudent from "@/components/forms/AddStudent"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function AddStudentPage() {
	await isAdmin()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"Add student"}
			description={"Add a student to the database."}
			btnTitle={"back"}
			href="/server/students"
		>
			<AddStudent />
		</ServerPageCard>
	)
}
