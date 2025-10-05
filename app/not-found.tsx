import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen text-center">
            <div className="flex flex-col items-center justify-around border-0 border-r-accent border-r-4 p-0 m-0 pr-6 mr-6">
                <h1 className="text-9xl font-bold font-kodchasan text-foreground-base">404</h1>
                <h3 className="text-7xl -tracking-widest font-extralight font-inter text-foreground-base">Not Found</h3>
            </div>
            <div className="flex flex-col items-start justify-center gap-6 font-inter">
                <p className="text-2xl font-regular text-foreground-base"><span className="font-bold">Ups...</span> esta página no existe.</p>
                <div className="flex items-center justify-end w-full text-lg">
                    <Link href="/" className="group text-foreground-muted font-inter">Volver a <span className="text-foreground-base font-medium group-hover:text-accent transition-all duration-75">Inicio</span></Link>
                </div>
            </div>
        </div>
    );
}
