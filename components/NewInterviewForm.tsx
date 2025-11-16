'use client'

import React, { useState } from 'react'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { NewInterviewFormSchema } from '@/lib/zod/schema'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { ENUM_AREAS, ENUM_INTERVIEWERS } from '@/types/enums'
import { AREAS } from '@/constants'


const formSchema = NewInterviewFormSchema();

const NewInterviewForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            area: ENUM_AREAS[0],
            interviewer: ENUM_INTERVIEWERS[0],
            position: ''
        }
    });

    const onSubmit = async (data: FormSchemaType) => {
        setIsLoading(true);
        try {
            console.log("Creating new interview with data:", data);
            // TODO Llamar a la acción para crear la entrevista
            // await createNewInterview(data);
            console.log("New interview created successfully");
        } catch (error) {
            console.log("Error creating new interview:", error);
            // setTimeout(() => { setIsLoading(false); }, 2000);
            setIsLoading(false)

            throw new Error("Error creating new interview");

        } finally {
            // setTimeout(() => { setIsLoading(false); }, 2000);
            setIsLoading(false)
        }
    }
    return (


        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    name='area'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className='flex flex-col gap-2'>
                                <FormLabel className='font-medium text-sm'>Area</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="flex flex-col gap-2"
                                    >
                                        {AREAS.map((area) => (
                                            <div key={area.id} className="flex items-center space-x-2">
                                                <RadioGroupItem value={area.id} id={area.id} />
                                                <Label htmlFor={area.id}>{area.label}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </FormItem>


                    )}
                />


                <Button type="submit" className='btn btn-primary cursor-pointer flex items-center justify-center'>{isLoading ? <div className='flex items-center justify-center gap-1'><Spinner /> <p>Creando Entrevista</p></div> : 'Crear Entrevista'}</Button>
            </form>
        </Form>

    )
}

export default NewInterviewForm