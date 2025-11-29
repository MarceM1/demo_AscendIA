
import { Metadata } from "next";
import MyInterviewsWrapper from "./Wrapper";


export const metadata: Metadata = {
  title: "AscendIA | Mis Entrevistas",
  description: "Mis entrevistas en AscendIA",
};

export default function MyInterviewsPage() {
  return (
    <MyInterviewsWrapper />
  );
}

