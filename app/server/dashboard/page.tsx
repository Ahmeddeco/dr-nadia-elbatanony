import ServerPageCard from "@/components/shared/ServerPageCard"
import { isAdmin } from "@/functions/isAdmin"
import { PlusCircle } from "lucide-react"

export default async function DashboardPage() {
	await isAdmin()

	return (
		<ServerPageCard icon={PlusCircle} title={"Dashboard page"} description={""} btnTitle={"Dashboard"} href={"#"}>
			<h1>Welcome to Dashboard page!</h1>
		</ServerPageCard>
	)
}
