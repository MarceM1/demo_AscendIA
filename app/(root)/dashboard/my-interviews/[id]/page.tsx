import { RouteParams } from '@/types/types'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "AscendIA | Entrevista seleccionada",
  description: "Registro de la entrevista seleccionada por el usuario.",
};


const page = async ({params}:RouteParams) => {

  const {id} = await params

  return (
    <div>Interview ID : {id}</div>
  )
}

export default page