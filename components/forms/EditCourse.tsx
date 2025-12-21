"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import SubmitButton from "../shared/SubmitButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DegreeProgram } from "@/generated/prisma/enums"
import { editCourseAction } from "@/actions/courseAction"
import { Textarea } from "../ui/textarea"
import CourseSchema from "@/schemas/CourseSchema"
import MultiSelect from "../shared/MultiSelect"

type Props = {
	defaultValues:
		| ({
				author: {
					id: string
					name: string
				}[]
				materials: {
					id: string
					title: string
				}[]
		  } & {
				level: DegreeProgram
				id: string
				title: string
				description: string | null
				code: string
				createdAt: Date
				updatedAt: Date
		  })
		| null
		| undefined
	allMaterials:
		| {
				id: string
				title: string
		  }[]
		| undefined
	allAuthors:
		| {
				id: string
				name: string
				image: string
		  }[]
		| undefined
}

export default function EditCourse({ defaultValues, allAuthors, allMaterials }: Props) {
	const [lastResult, action] = useActionState(editCourseAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: CourseSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" value={defaultValues?.id ?? ""} name="id" />
			{/* ---------------------------------- title --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
				<Input
					type="text"
					key={fields.title.key}
					name={fields.title.name}
					defaultValue={defaultValues?.title}
					placeholder="Ahmed Mohamed"
				/>
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* --------------------------------- authors --------------------------------- */}
			<MultiSelect
				allSelectedData={allAuthors?.map((prof) => ({ id: prof.id, title: prof.name, image: prof.image }))}
				inputName={"authors"}
				label={"authors"}
				defaultValues={defaultValues?.author.map((prof) => ({ id: prof.id, title: prof.name }))}
			/>
			{/* ---------------------------------- description --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>{fields.description.name}</FieldLabel>
				<Textarea
					key={fields.description.key}
					name={fields.description.name}
					defaultValue={defaultValues?.description ?? ""}
				/>
				<FieldError>{fields.description.errors}</FieldError>
			</Field>
			{/* ---------------------------------- code ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.code.name}>{fields.code.name}</FieldLabel>
				<Input
					type="text"
					key={fields.code.key}
					name={fields.code.name}
					defaultValue={defaultValues?.code}
					placeholder="mb-001"
				/>
				<FieldError>{fields.code.errors}</FieldError>
			</Field>
			{/* --------------------------------- level -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.level.name}>level</FieldLabel>
				<Select key={fields.level.key} name={fields.level.name} defaultValue={defaultValues?.level}>
					<SelectTrigger>
						<SelectValue placeholder={DegreeProgram.master} />
					</SelectTrigger>
					<SelectContent>
						{Object.values(DegreeProgram).map((degreeProgram) => (
							<SelectItem value={degreeProgram} key={degreeProgram}>
								{degreeProgram}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FieldError>{fields.level.errors}</FieldError>
			</Field>

			<MultiSelect
				allSelectedData={allMaterials}
				inputName={"materials"}
				label={"materials"}
				defaultValues={defaultValues?.materials}
			/>

			<SubmitButton text={"edit course"} />
		</Form>
	)
}
