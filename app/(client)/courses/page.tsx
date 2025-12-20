import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllCoursesForCoursesPage } from "@/dl/courseData"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { CircleX, Home, LogIn } from "lucide-react"
import EmptyCard from "@/components/shared/EmptyCard"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ page: string; size: string }> }) {
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 12
	const courses = await getAllCoursesForCoursesPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			icon={Home}
			title={"all courses"}
			description={"All courses in that we provide to you."}
			btnTitle={"go to home"}
			href={"/"}
			className="bg-background my-8"
		>
			{courses?.data.length == 0 ? (
				<EmptyCard href={"/"} linkTitle={"go to home"} linkIcon={Home} />
			) : (
				<div className=" h-full flex flex-wrap items-center justify-center w-fit gap-8">
					{courses?.data.map(({ author, code, description, id, level, materials, title }) => (
						<Dialog key={id}>
							{/* ------------------------ DialogTrigger ----------------------- */}
							<DialogTrigger asChild>
								<Card className="lg:w-sm w-full cursor-pointer">
									<CardHeader>
										<CardTitle>{title}</CardTitle>
										<CardDescription>{description}</CardDescription>
									</CardHeader>
								</Card>
							</DialogTrigger>

							{/* ------------------------ DialogContent ----------------------- */}
							<DialogContent>
								<DialogHeader>
									<DialogTitle>{title}</DialogTitle>
									<div className="flex flex-col gap-2 capitalize">
										<h6>author: {author}</h6>
										<h6>code: {code}</h6>
										<h6>level: {level}</h6>
										<h6>materials:</h6>
										<div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
											{materials.map(({ id, title }) => (
												<Badge key={id} variant={"secondary"}>
													{title}
												</Badge>
											))}
										</div>
										<Separator />
										<h6>description:</h6>
										<p className="lowercase">{description}</p>
									</div>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					))}

					<Pagination>
						<PaginationContent>
							<PaginationItem>
								{/* --------------------------- Previous --------------------------- */}
								{pageNumber > 1 && <PaginationPrevious href={`?size=${pageSize}&page=${pageNumber - 1}`} />}
							</PaginationItem>
							{/* ------------------------- PaginationLink ------------------------ */}
							{Array.from({ length: courses!.totalPages ?? 1 }).map((_, index) => (
								<PaginationItem key={index}>
									<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								{/* ----------------------------- Next ----------------------------- */}
								{pageNumber < courses!.totalPages && (
									<PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}`} />
								)}
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</ServerPageCard>
	)
}
