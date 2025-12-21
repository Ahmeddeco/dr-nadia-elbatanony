import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
				<h1>our courses</h1>
				<h6 className="max-w-lg text-center">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quaerat asperiores dignissimos?
				</h6>
			</div>
			<div className=" h-full flex flex-wrap items-center justify-center w-fit gap-8">
				{researches?.data.map(({ authors, description, id, journal, link, publicationDate, title }) => (
					<Dialog key={id}>
						{/* ------------------------ DialogTrigger ----------------------- */}
						<DialogTrigger asChild>
							<Card className="lg:w-sm w-full cursor-pointer">
								<CardHeader>
									<CardTitle className="text-primary text-center ">{title}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex flex-col gap-2 capitalize">
										<h6 className="text-center">
											<span className="text-primary font-semibold">journal :</span> {journal}
										</h6>
										<h6 className="text-center">
											<span className="text-primary font-semibold">publication Date :</span>{" "}
											{publicationDate.toLocaleDateString("en-GB", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</h6>
									</div>
								</CardContent>
							</Card>
						</DialogTrigger>

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
								<h6 className="text-center">
									<span className="text-primary font-semibold">journal :</span> {journal}
								</h6>
								<Separator />
								<h6 className="text-primary font-semibold">description:</h6>
								<p className="lowercase">{description}</p>
							</div>
							<DialogFooter>
								<Button asChild>
									<Link href={link} target="_blank">
										<Eye /> see the research
									</Link>
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
