import { FC, ReactNode } from "react";
import SearchDestinationForm from "../components/search-destination/SearchDestinationForm";
import Header from "../components/header/Header";

interface IProps {
    children: ReactNode;
}

const HotelLayout: FC<IProps> = ({ children }) => {
    return (
        <>
            <Header className="w-full bg-zinc-100 py-5" />

            <div className="min-h-screen max-w-4xl pt-4 mx-auto">
                <SearchDestinationForm />
                <div className="mt-3">{children}</div>
            </div>
        </>
    );
};

export default HotelLayout;
