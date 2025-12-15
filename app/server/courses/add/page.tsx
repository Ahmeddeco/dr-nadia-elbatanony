import AddCourse from "@/components/forms/AddCourse"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function AddCoursePage() {
	await isAdmin()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"Add Course"}
			description={"Add a Course to the database."}
			btnTitle={"back"}
			href="/server/courses"
		>
			<AddCourse />
		</ServerPageCard>
	)
}
