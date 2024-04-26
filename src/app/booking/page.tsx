import { FC } from "react";
import BookingHeader from "./components/booking-header/BookingHeader";
import BookingTable from "./components/booking-table/BookingTable";

interface IProps {}

const BookingPage: FC<IProps> = () => {
    return (
        <>
            <BookingHeader />

            <main className="container max-w-5xl mx-auto px-4">
                <BookingTable />
            </main>
        </>
    );
};

export default BookingPage;
