import UserButton from "@/components/auth/UserButton"
import { ThemeButton } from "../theme/ThemeButton"
import FrontNavigation from "./FrontNavigation"
import Logo from "./Logo"
import MobileMenu from "./MobileMenu"

export default function Header() {
	return (
		<header className="fixed inset-0 flex items-center justify-between h-12 lg:h-14 border border-primary shadow-2xl bg-foreground text-background px-4 lg:px-16 z-50 shadow-md container mx-auto rounded-full mt-4  ">
			<Logo />
			<nav className="hidden lg:flex items-center gap-6">
				<FrontNavigation />
			</nav>
			<div className="hidden lg:flex items-center gap-4">
				<ThemeButton />
				<UserButton />
			</div>
			<div className="lg:hidden block">
				<MobileMenu />
			</div>
		</header>
	)
}
