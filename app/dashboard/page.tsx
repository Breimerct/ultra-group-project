"use client";
import { FC, useState } from "react";
import HotelsTable from "./components/hotels/HotelsTable";
import RoomsTable from "./components/rooms/RoomsTable";
import { PlusIcon } from "../components/Icons";
import HotelForm from "./components/hotels/HotelForm";
import { IHotel } from "../api/hotel/hotel.service";
import { useHotelStore } from "../store/hotel-store/hotel.store";

const DashboardPage: FC = () => {
    const [showHotelForm, setShowHotelForm] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [hotelSelected, setHotelSelected] = useState<IHotel | null>(null);
    const [modalTitle, setModalTitle] = useState("Nuevo Hotel");
    const { deleteHotelById } = useHotelStore();

    const handleShowHotelFormToEdit = (hotel: IHotel) => {
        setModalTitle("Editar Hotel");
        setHotelSelected(hotel);
        setShowHotelForm(true);
        setReadOnly(false);
    };

    const handleShowHotelFormToView = (hotel: IHotel) => {
        setModalTitle("");
        setHotelSelected(hotel);
        setShowHotelForm(true);
        setReadOnly(true);
    };

    const handleShowHotelFormToCreate = () => {
        setModalTitle("Nuevo Hotel");
        setShowHotelForm(true);
        setReadOnly(false);
    };

    const handleCloseHotelForm = () => {
        setShowHotelForm(false);
        setReadOnly(false);
        setHotelSelected(null);
    };

    const handleRemoveHotel = (hotel: IHotel) => {
        const confirm = window.confirm(`¿Está seguro de eliminar el hotel ${hotel.name}?`);

        if (confirm && hotel.id) {
            deleteHotelById(hotel.id);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full bg-zinc-300 shadow-md shadow-zinc-500 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">Hoteles</h2>

                    <div>
                        <button
                            className="bg-emerald-800 mx-auto text-white px-7 py-2 flex justify-center items-center flex-nowrap gap-2 rounded-md hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                            onClick={handleShowHotelFormToCreate}
                        >
                            <PlusIcon />
                            Nuevo hotel
                        </button>
                    </div>
                </div>

                <div>
                    <HotelsTable
                        onView={handleShowHotelFormToView}
                        onEdit={handleShowHotelFormToEdit}
                        onRemove={handleRemoveHotel}
                    />
                </div>
                <HotelForm
                    title={modalTitle}
                    isOpen={showHotelForm}
                    onClose={handleCloseHotelForm}
                    readOnly={readOnly}
                    hotel={hotelSelected}
                />
            </div>

            <div className="w-full bg-zinc-300 shadow-md shadow-zinc-500 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">Habitaciones</h2>

                    <div>
                        <button className="bg-emerald-800 mx-auto text-white px-7 py-2 flex justify-center items-center flex-nowrap gap-2 rounded-md hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none">
                            <PlusIcon />
                            Nueva Habitación
                        </button>
                    </div>
                </div>

                <div>
                    <RoomsTable />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
