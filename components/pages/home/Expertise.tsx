import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { expertise } from "@/constants/homePage"

export default function Expertise() {
	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<h2 className="text-primary">Research Areas & Expertise</h2>
			<h6 className="max-w-lg text-center">
				Dr. Elbatanony’s work focuses heavily on the intersection of microbiology and environmental sustainability. Her
				core areas of expertise include:
			</h6>

			{/* --------------------------- Expertise points -------------------------- */}
			<div className="lg:w-4xl w-full">
				{expertise.map(({ description, point }, index) => (
					<Accordion type="single" collapsible key={index}>
						<AccordionItem value="item-1">
							<AccordionTrigger>
								<h4>{point}</h4>
							</AccordionTrigger>
							<AccordionContent>
								<h6 className="text-start">{description}</h6>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</section>
	)
}
