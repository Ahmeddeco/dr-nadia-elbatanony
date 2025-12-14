import { isAdmin } from "@/functions/isAdmin"

export default async function ServerPage() {
	await isAdmin()

	return <h1>ServerPage</h1>
}
