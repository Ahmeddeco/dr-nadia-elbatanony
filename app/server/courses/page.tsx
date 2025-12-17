import { isAdmin } from "@/functions/isAdmin"
import { MoreVertical, PlusCircle, UserSquare2 } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Form from "next/form"
import { Input } from "@/components/ui/input"
import { deleteStudentAction } from "@/actions/studentAction"
import { getAllCoursesForCoursesPage } from "@/dl/courseData"
import { deleteCourseAction } from "@/actions/courseAction"
import { Badge } from "@/components/ui/badge"

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ page: string; size: string }> }) {
	await isAdmin()

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const courses = await getAllCoursesForCoursesPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			icon={PlusCircle}
			title={"all courses"}
			description={"All courses in the database."}
			btnTitle={"add course"}
			href={"/server/courses/add"}
		>
			{courses?.data.length == 0 ? (
				<EmptyCard href={"/server/courses/add"} linkTitle={"add course"} linkIcon={UserSquare2} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>code</TableHead>
							<TableHead>title</TableHead>
							<TableHead>author</TableHead>
							<TableHead>level</TableHead>
							<TableHead>materials</TableHead>
							<TableHead className="text-right">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{courses?.data.map(({ code, id, level, title, author, materials }) => (
							<TableRow key={id}>
								<TableCell className="capitalize">{code} </TableCell>
								<TableCell className="capitalize">{title}</TableCell>
								<TableCell className="capitalize">{author} </TableCell>
								<TableCell className="capitalize">{level} </TableCell>
								<TableCell className="flex flex-wrap gap-2 ">
									{materials.map((material) => (
										<Badge key={material.id}>{material.title}</Badge>
									))}
								</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger>
											<MoreVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="space-y-2">
											<DropdownMenuItem asChild>
												<Button variant={"default"} size={"full"} asChild>
													<Link href={`/server/courses/edit/${id}`}>edit</Link>
												</Button>
											</DropdownMenuItem>
											{/* ---------------------------- delete --------------------------- */}
											<DropdownMenuItem asChild>
												<Dialog>
													<DialogTrigger asChild>
														<Button variant={"destructive"} size={"full"}>
															delete
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>Are you sure you want to delete this product ?</DialogTitle>
															<DialogDescription>
																This action can not be undone. This will permanently delete this product and remove its
																data from our servers.
															</DialogDescription>
														</DialogHeader>
														<div className="flex items-center justify-between ">
															<Button asChild>
																<DialogClose>cancel</DialogClose>
															</Button>
															<Form action={deleteCourseAction}>
																<Input type="hidden" name="id" value={id} />
																<Button variant={"destructive"} type="submit">
																	delete
																</Button>
															</Form>
														</div>
													</DialogContent>
												</Dialog>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
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
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
