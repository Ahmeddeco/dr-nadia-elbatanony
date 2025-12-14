import { isAdmin } from "@/functions/isAdmin"
import { Armchair, MoreVertical, PlusCircle, UserSquare2 } from "lucide-react"
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
import { getAllStudentsForStudentsPage } from "@/dl/studentData"
import { deleteStudentAction } from "@/actions/studentAction"

export default async function StudentsPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; size: string }>
}) {
	await isAdmin()

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const students = await getAllStudentsForStudentsPage(pageSize, pageNumber)

	console.log("students from StudentsPage", students)

	return (
		<ServerPageCard
			icon={PlusCircle}
			title={"all students"}
			description={"All students in the database."}
			btnTitle={"add student"}
			href={"/server/students/add"}
		>
			{students?.data.length == 0 ? (
				<EmptyCard href={"/server/students/add"} linkTitle={"add student"} linkIcon={UserSquare2} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>image</TableHead>
							<TableHead>name</TableHead>
							<TableHead>age</TableHead>
							<TableHead>email</TableHead>
							<TableHead>mobile</TableHead>
							<TableHead>gender</TableHead>
							<TableHead>address</TableHead>
							<TableHead>grad</TableHead>
							<TableHead className="text-right">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{students?.data.map(
							({ age, city, country, degreeProgram, email, gender, id, image, mobile, name, state }) => (
								<TableRow key={id}>
									<TableCell>
										<Image
											src={image ?? "/noImage.svg"}
											alt={name ?? "noImage"}
											width={50}
											height={50}
											className="rounded-lg object-cover aspect-square"
										/>
									</TableCell>
									<TableCell className="capitalize">{name}</TableCell>
									<TableCell className="capitalize">{age} years</TableCell>
									<TableCell className="capitalize">{email}</TableCell>
									<TableCell>{mobile}</TableCell>
									<TableCell className="capitalize">{gender}</TableCell>
									<TableCell className="capitalize">
										{country} - {state} - {city}
									</TableCell>
									<TableCell>{degreeProgram}</TableCell>
									{/* -------------------------------- settings -------------------------------- */}
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger>
												<MoreVertical />
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="space-y-2">
												<DropdownMenuItem asChild>
													<Button variant={"default"} size={"full"} asChild>
														<Link href={`/server/students/edit/${id}`}>edit</Link>
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
																	This action can not be undone. This will permanently delete this product and remove
																	its data from our servers.
																</DialogDescription>
															</DialogHeader>
															<div className="flex items-center justify-between ">
																<Button asChild>
																	<DialogClose>cancel</DialogClose>
																</Button>
																<Form action={deleteStudentAction}>
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
							)
						)}
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
								{Array.from({ length: students!.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < students!.totalPages && (
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
