import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Home } from "lucide-react"
import EmptyCard from "@/components/shared/EmptyCard"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { getAllResearchesForResearchesPage } from "@/dl/researchData"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ResearchesPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; size: string }>
}) {
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 12
	// const courses = await getAllCoursesForCoursesPage(pageSize, pageNumber)
	const researches = await getAllResearchesForResearchesPage(pageSize, pageNumber)

	return researches?.data.length == 0 ? (
		<EmptyCard href={"/"} linkTitle={"go to home"} linkIcon={Home} />
	) : (
		<div className="py-12 flex flex-col items-center justify-center gap-8">
			<div className="flex flex-col items-center justify-center gap-2">
				<h1>our researches</h1>
				<h6 className="max-w-lg text-center">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quaerat asperiores dignissimos?
				</h6>
			</div>
			<div className=" h-full flex flex-wrap items-center justify-center w-fit gap-8">
				{researches?.data.map(({ authors, description, id, journal, link, publicationDate, title }) => (
					<Dialog key={id}>
						{/* ------------------------ DialogTrigger ----------------------- */}
						<Card className="lg:w-sm aspect-video w-full ">
							<CardHeader>
								<CardTitle className="line-clamp-2">{title}</CardTitle>
								<CardDescription>{publicationDate.toLocaleDateString("en-GB", { year: "numeric" })}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-2 capitalize">
									<h6>journal :</h6>
									<Badge key={id} variant={"secondary"}>
										{journal}
									</Badge>
								</div>
							</CardContent>
							<CardFooter className="justify-center ">
								<Button asChild>
									<DialogTrigger>
										<Eye /> see more
									</DialogTrigger>
								</Button>
							</CardFooter>
						</Card>

						{/* ------------------------ DialogContent ----------------------- */}
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{title}</DialogTitle>
							</DialogHeader>
							<div className="flex flex-col gap-2 capitalize">
								<h6>author:</h6>
								<div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
									{authors.map(({ id, name }) => (
										<Badge key={id} variant={"secondary"}>
											{name}
										</Badge>
									))}
								</div>
								<h6>journal :</h6>
								<Badge key={id} variant={"secondary"}>
									{journal}
								</Badge>
								<Separator />
								<h6 className=" font-semibold">description:</h6>
								<p className="lowercase">{description}</p>
							</div>
							<DialogFooter>
								<Button asChild>
									{link ? (
										<Link href={link} target="_blank">
											<Eye /> see the research
										</Link>
									) : null}
								</Button>
							</DialogFooter>
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
						{Array.from({ length: researches!.totalPages ?? 1 }).map((_, index) => (
							<PaginationItem key={index}>
								<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							{/* ----------------------------- Next ----------------------------- */}
							{pageNumber < researches!.totalPages && (
								<PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}`} />
							)}
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}
