import ServerPageCard from "@/components/shared/ServerPageCard"
import { PlusCircle } from "lucide-react"

export default function DashboardPage() {
	return (
		<ServerPageCard icon={PlusCircle} title={"Dashboard page"} description={""} btnTitle={"Dashboard"} href={"#"}>
			<h1>Welcome to Dashboard page!</h1>
		</ServerPageCard>
	)
}
