"use client";

import { FC, useState } from "react";
import { useHotelStore } from "@store/hotel-store/hotel.store";
import { useRoomStore } from "@store/room-store/room.store";
import HotelsTable from "./components/hotels/HotelsTable";
import RoomsTable from "./components/rooms/RoomsTable";
import HotelForm from "./components/hotels/HotelForm";
import RoomForm from "./components/rooms/RoomForm";
import { PlusIcon } from "@components/Icons";
import { IHotel, IRoom } from "@/types";

const DashboardPage: FC = () => {
    const [showHotelForm, setShowHotelForm] = useState(false);
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [hotelSelected, setHotelSelected] = useState<IHotel | null>(null);
    const [roomSelected, setRoomSelected] = useState<IRoom | null>(null);
    const [modalTitle, setModalTitle] = useState("Nuevo Hotel");
    const { deleteHotelById } = useHotelStore();
    const { deleteRoomById } = useRoomStore();

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
        setHotelSelected(null);
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

        if (confirm && hotel._id?.toString()) {
            deleteHotelById(hotel._id?.toString());
        }
    };

    const handleCreateNewRoom = () => {
        setModalTitle("Nueva Habitación");
        setRoomSelected(null);
        setShowRoomForm(true);
        setReadOnly(false);
    };

    const handleRemoveRoom = (room: IRoom) => {
        const confirm = window.confirm(`¿Está seguro de eliminar la habitación ${room.name}?`);

        if (confirm && room._id) {
            deleteRoomById(room._id);
        }
    };

    const handleEditRoom = (room: IRoom) => {
        setModalTitle("Editar Habitación");
        setRoomSelected(room);
        setShowRoomForm(true);
        setReadOnly(false);
    };

    const handleViewRoom = (room: IRoom) => {
        setModalTitle("");
        setRoomSelected(room);
        setShowRoomForm(true);
        setReadOnly(true);
    };

    const handleCloseRoomForm = () => {
        setShowRoomForm(false);
        setReadOnly(false);
        setRoomSelected(null);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full shadow-md shadow-zinc-500 p-4 rounded-md border-t-4 border-emerald-700">
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

            <div className="w-full shadow-md shadow-zinc-500 p-4 rounded-md border-t-4 border-emerald-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">Habitaciones</h2>

                    <div>
                        <button
                            className="bg-emerald-800 mx-auto text-white px-7 py-2 flex justify-center items-center flex-nowrap gap-2 rounded-md hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                            onClick={handleCreateNewRoom}
                        >
                            <PlusIcon />
                            Nueva Habitación
                        </button>
                    </div>
                </div>

                <div>
                    <RoomsTable
                        onRemove={handleRemoveRoom}
                        onEdit={handleEditRoom}
                        onView={handleViewRoom}
                    />
                </div>

                <RoomForm
                    readOnly={readOnly}
                    room={roomSelected}
                    isOpen={showRoomForm}
                    title={modalTitle}
                    onClose={handleCloseRoomForm}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
