import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="min-h-dvh pt-14 container mx-auto">{children}</main>
			<Footer />
		</>
	)
}
