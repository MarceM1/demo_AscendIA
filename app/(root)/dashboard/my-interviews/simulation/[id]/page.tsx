
import { Metadata } from "next";
import { RouteParams } from "@/types/types";
import SimulationUI from "./SimulationUI";


export const metadata: Metadata = {
  title: "AscendIA | Simulación de Entrevistas",
  description: "Simula entrevistas técnicas con AscendIA",
};

export default  async function SimulationInterviewPage({params}:RouteParams) {
  const {id} = await params

  return (
    <SimulationUI interviewId={id}/>
  );
}