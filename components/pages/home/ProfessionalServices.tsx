import { Card, CardContent } from "@/components/ui/card"
import { services } from "@/constants/homePage"
import React from "react"

export default function ProfessionalServices() {
	return (
		<section className="flex flex-col items-center justify-center gap-8">
			<div className="flex flex-col items-center justify-center gap-2">
				<h2>Professional Service & Expertise</h2>
				<h6 className="max-w-lg text-center w-full">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus aperiam voluptas delectus ratione
					voluptatem maiores earum quo possimus.
				</h6>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-8">
				{services.map(({ description, icon, title }) => (
					<Card
						key={title}
						className="w-xs lg:w-md aspect-video even:bg-primary even:text-primary-foreground hover:scale-105 ease-in-out duration-700 hover:rotate-1 "
					>
						<CardContent className="flex flex-col items-center justify-center gap-4">
							{React.createElement(icon, { size: "96" })}
							<h4>{title}</h4>
							<h6 className="text-center text-balance">{description}</h6>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}
