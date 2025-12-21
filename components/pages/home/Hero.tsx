import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getStudentsImageForHomePage } from "@/dl/studentData"
import { faker } from "@faker-js/faker"
import { CloudDownload, SearchCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PiVirusThin } from "react-icons/pi"

export default async function Hero() {
	const students = await getStudentsImageForHomePage()
	const studentImages = students?.data
	const totalStudent = students?.totalStudents
	return (
		<section className="flex lg:flex-row flex-col items-center justify-between  lg:h-[80vh] h-auto">
			{/* --------------------------------- title -------------------------------- */}
			<div className="flex flex-1 flex-col lg:items-start items-center gap-4">
				<h1>
					dr Nadia Elbatanony <br />
					professor of microbiology
				</h1>
				<h6 className="max-w-lg">
					Nadia M. Elbatanony is a Professor of Microbiology at the Environmental Studies and Research Institute (ESRI),
					University of Sadat City, Egypt. With a career spanning several decades, she has established herself as a
					leading expert in the field of Environmental and Agricultural Microbiology, specifically focusing on
					sustainable development through microbial solutions.
				</h6>

				{/* ------------------------------- Buttons ------------------------------ */}
				{/* TODO add links to buttons */}
				<div className="flex items-center gap-4">
					<Button asChild>
						<Link href={"#"}>
							<CloudDownload /> download CV
						</Link>
					</Button>
					<Button asChild variant={"outline"}>
						<Link href={"#"}>
							<SearchCheck /> view researchers
						</Link>
					</Button>
				</div>

				{/* -------------------------- trusted students -------------------------- */}
				<div className="flex flex-col gap-2 w-full">
					<div className="flex items-center gap-4">
						<h4 className="uppercase">trusted by</h4>
						<h6>Over {totalStudent} Students</h6>
					</div>
					<div className="-space-x-2 flex ">
						{studentImages?.map(({ image, name }) => (
							<Avatar key={image} className="border border-primary">
								<AvatarImage src={faker.image.personPortrait()} />
								<AvatarFallback>{name[0]} </AvatarFallback>
							</Avatar>
						))}
					</div>
				</div>
			</div>

			{/* --------------------------------- Main Image -------------------------------- */}
			<div className="relative aspect-square flex-1 w-full ">
				<Image src={"/hero.avif"} alt={"Nadia M. Elbatanony"} fill className="object-contain z-20" />
				<PiVirusThin className="text-chart-3/30 size-72 lg:block hidden absolute top-64 right-4  z-10" />
				<PiVirusThin className="text-chart-4/30 size-44  absolute lg:top-72 top-24 lg:right-16 left-2 z-10" />
				<PiVirusThin className="text-chart-5/30 size-24  absolute top-12 right-2 z-10" />
			</div>
		</section>
	)
}
