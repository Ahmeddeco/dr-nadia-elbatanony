import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllCoursesForCoursesPage } from "@/dl/courseData"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Home } from "lucide-react"
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

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ page: string; size: string }> }) {
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 12
	const courses = await getAllCoursesForCoursesPage(pageSize, pageNumber)

	return courses?.data.length == 0 ? (
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
				{courses?.data.map(({ author, code, description, id, level, materials, title }) => (
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
											<span className="text-primary font-semibold">code :</span> {code}
										</h6>
										<h6 className="text-center">
											<span className="text-primary font-semibold">level :</span> {level}
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
									{materials.map(({ id, title }) => (
										<Badge key={id} variant={"secondary"}>
											{title}
										</Badge>
									))}
								</div>
								<h6>materials:</h6>
								<div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
									{author.map(({ id, name }) => (
										<Badge key={id} variant={"secondary"}>
											{name}
										</Badge>
									))}
								</div>
								<h6>code: {code}</h6>
								<h6>level: {level}</h6>
								<Separator />
								<h6>description:</h6>
								<p className="lowercase">{description}</p>
							</div>
							{/* TODO add dialogFooter for a button that give a student an ability to send a request to the professor to enroll the course  */}
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
							{pageNumber < courses!.totalPages && <PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}`} />}
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}
