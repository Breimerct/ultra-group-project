import { FC } from "react";

const Loading: FC = () => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-30 min-h-screen bg-slate-100 w-full grid place-content-center">
            <h1 className="text-5xl text-center font-bold">Cargando...</h1>
            <p className="text-center text-lg">por favor espere.</p>
        </div>
    );
};

export default Loading;
