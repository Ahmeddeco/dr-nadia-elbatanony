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
import { addCourseAction } from "@/actions/courseAction"
import { Textarea } from "../ui/textarea"
import CourseSchema from "@/schemas/CourseSchema"
import MultiSelect from "../shared/MultiSelect"

type Props = {
	allMaterials: {
		id: string
		title: string
	}[]
	allAuthors:
		| {
				id: string
				name: string
				image: string | null
		  }[]
		| undefined
}

export default function AddCourse({ allMaterials, allAuthors }: Props) {
	const [lastResult, action] = useActionState(addCourseAction, undefined)
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
			{/* ---------------------------------- title --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
				<Input
					type="text"
					key={fields.title.key}
					name={fields.title.name}
					defaultValue={fields.title.initialValue}
					placeholder="Micro Biology"
				/>
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* --------------------------------- authors --------------------------------- */}
			<MultiSelect
				allSelectedData={allAuthors?.map((prof) => ({ id: prof.id, title: prof.name, image: prof.image }))}
				inputName={"authors"}
				label={"authors"}
			/>

			{/* ---------------------------------- description --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>{fields.description.name}</FieldLabel>
				<Textarea
					key={fields.description.key}
					name={fields.description.name}
					defaultValue={fields.description.initialValue}
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
					defaultValue={fields.code.initialValue}
					placeholder="mb-001"
				/>
				<FieldError>{fields.code.errors}</FieldError>
			</Field>

			{/* --------------------------------- level -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.level.name}>level</FieldLabel>
				<Select key={fields.level.key} name={fields.level.name} defaultValue={fields.level.initialValue}>
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

			{/* -------------------------------- materials ------------------------------- */}
			<MultiSelect allSelectedData={allMaterials} inputName={"materials"} label={"materials"} />

			<SubmitButton text={"add course"} />
		</Form>
	)
}
