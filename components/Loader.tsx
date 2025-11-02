import { Spinner } from "./ui/spinner"

const Loader = () => {
    return (
        <div className="w-16 h-10 flex items-center justify-center">
            <Spinner className="size-8 text-foreground-base" />
        </div>
    )
}

export default Loader