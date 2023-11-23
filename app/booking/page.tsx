import { FC } from "react";
import BookingHeader from "./components/booking-header/BookingHeader";

interface IProps {}

const BookingPage: FC<IProps> = () => {
    return (
        <>
            <BookingHeader />

            <main className="container mx-auto px-4">hola mundo</main>
        </>
    );
};

export default BookingPage;
