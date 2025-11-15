'use client'

import React, { useState } from 'react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { NewInterviewFormSchema } from '@/lib/utils'
import { Form } from '@/components/ui/form'


const formSchema = NewInterviewFormSchema();

const NewInterviewForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    type FormSchemaType = z.infer<typeof formSchema>;
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            area: 'TECNOLOGÍA / IT',
            interviewer: 'MICHAEL',
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
            setIsLoading(false);
            throw new Error("Error creating new interview");

        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div>NewInterviewForm</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className='flex flex-col gap-4'>
                        
                    </div>
                    <button type="submit" className='btn btn-primary'>{isLoading ? 'Creando Entrevista':'Crear Entrevista'}</button>
                </form>
            </Form>
        </>
    )
}

export default NewInterviewForm