import EditStudent from "@/components/forms/EditStudent"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getOneStudent } from "@/dl/studentData"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
	await isAdmin()
	const id = (await params).id

	const student = await getOneStudent(id)
	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit student"}
			description={"edit a student to the database."}
			btnTitle={"back"}
			href="/server/students"
		>
			<EditStudent student={student!} />
		</ServerPageCard>
	)
}
