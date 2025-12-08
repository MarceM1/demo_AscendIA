"use client"

import { useTransition } from "react"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { NewInterviewFormSchema } from "@/lib/zod/schema"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { AREAS, INTERVIEWERS } from "@/constants"
import { ENUM_AREAS, ENUM_INTERVIEWERS } from "@/types/enums"

import { createNewInterview } from "@/lib/actions/interviews/create-interview.actions"
import { useRouter } from "next/navigation"

const formSchema = NewInterviewFormSchema()

export default function NewInterviewForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    type FormSchemaType = z.infer<typeof formSchema>

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            area: ENUM_AREAS[0],
            interviewer: ENUM_INTERVIEWERS[0],
            position: "",
        },
    })

    const onSubmit = (data: FormSchemaType) => {
        startTransition(async () => {
            const result = await createNewInterview(null, data)

            if (result.success) {
                router.push(`/dashboard/my-interviews/${result.data.interviewId}`)
            } else {
                form.setError("position", {
                    type: "server",
                    message: result.message,
                })
            }
        })
    }

    const isLoading = isPending

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[1092px] mx-auto flex flex-col gap-8">

                {/* AREA */}
                <Controller
                    name="area"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium text-foreground-muted text-2xl font-inter">
                                Área profesional
                            </FormLabel>
                            <p className="text-sm text-foreground-muted mb-4">
                                Definí el ámbito de trabajo para ajustar el tipo de preguntas.
                            </p>
                            <FormControl>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex gap-2 flex-wrap"
                                >
                                    {AREAS.map(({ id, label }) => (
                                        <div
                                            key={id}
                                            className={cn(
                                                "w-fit flex items-center space-x-2 border border-base-border rounded-md bg-background-light mb-2 p-4 group gradient-hover",
                                                field.value === id ? "gradient shadow-md" : ""
                                            )}
                                        >
                                            <RadioGroupItem value={id} id={`area-${id}`} className="cursor-pointer" />
                                            <Label htmlFor={`area-${id}`} className="cursor-pointer">
                                                {label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* INTERVIEWER */}
                <Controller
                    name="interviewer"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium text-foreground-muted text-2xl font-inter">
                                Entrevistador
                            </FormLabel>
                            <p className="text-sm text-foreground-muted mb-4">
                                Seleccioná el estilo de entrevistador para simular diferentes enfoques y personalidades.
                            </p>
                            <FormControl>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex gap-2 flex-wrap"
                                >
                                    {INTERVIEWERS.map(({ id, label }) => (
                                        <div
                                            key={id}
                                            className={cn(
                                                "w-fit flex items-center space-x-2 border border-base-border rounded-md bg-background-light mb-2 p-4 group gradient-hover",
                                                field.value === id ? "gradient shadow-md" : ""
                                            )}
                                        >
                                            <RadioGroupItem value={id} id={`interviewer-${id}`} className="cursor-pointer" />
                                            <Label htmlFor={`interviewer-${id}`} className="cursor-pointer">
                                                {label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* POSITION */}
                <FormField
                    name="position"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium text-foreground-muted text-2xl font-inter">Puesto</FormLabel>
                            <p className="text-sm text-foreground-muted mb-4">
                                Describí brevemente el rol al que apuntás o pegá el anuncio de trabajo.
                            </p>
                            <FormControl>
                                <Textarea {...field} className="border-base-border bg-background-base" />
                            </FormControl>
                            {form.formState.errors.position && (
                                <p className="text-sm text-red-500 mt-1">{form.formState.errors.position.message}</p>
                            )}
                        </FormItem>
                    )}
                />

                {/* ACTIONS */}
                <div className="flex w-full flex-col gap-2 place-items-end-safe justify-center-safe">
                    <div className="flex gap-2 w-fit">
                        <Button  type="submit" disabled={isLoading} className="w-fit bg-background-light flex items-center justify-center gradient-hover hover:text-foreground-muted">
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-1">
                                    <Spinner aria-hidden="true"/>
                                    <p className="text-foreground-muted">Estamos creando tu entrevista...</p>
                                </div>
                            ) : (
                                <p>Creemos tu entrevista</p>
                            )}
                        </Button>

                        <Button type="button" variant="ghost" className="bg-background-base text-foreground-muted hover:text-white transition">
                            Volver atrás
                        </Button>
                    </div>

                    <p className="text-xs text-foreground-muted">Generaremos una entrevista adaptada a tu perfil.</p>
                </div>
            </form>
        </Form>
    )
}
