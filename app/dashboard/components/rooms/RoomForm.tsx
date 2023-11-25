"use client";
import { IHotel } from "@/app/api/hotel/hotel.service";
import { IRoom } from "@/app/api/room/room.service";
import Autocomplete from "@/app/components/autocomplete/Autocomplete";
import CheckBox from "@/app/components/checkbox/CheckBox";
import Input from "@/app/components/input/Input";
import Modal from "@/app/components/modal/Modal";
import TextArea from "@/app/components/textarea/TextArea";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { useRoomStore } from "@/app/store/room-store/room.store";
import { DEFAULT_IMAGE } from "@/hooks/useRandomImage/useRandomImage";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    room: IRoom | null;
    title?: string;
    readOnly?: boolean;
}

const validateSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    stars: Yup.number().required("Las estrellas son requeridas").max(5, "Las estrellas deben ser menor a 5"),
    price: Yup.number().required("El precio es requerido").min(0, "El precio debe ser mayor a 0"),
    isAvailable: Yup.boolean().required("La disponibilidad es requerida"),
    hotel: Yup.string().required("El hotel es requerido"),
});

const RoomForm: FC<IProps> = ({ isOpen, room, onClose, title = "Nueva Habitación", readOnly }) => {
    const { hotels } = useHotelStore();
    const { updateRoomById, createRoom } = useRoomStore();
    const [show, setShow] = useState(isOpen);
    const [hotelSelected, setHotelSelected] = useState<IHotel | null>(null);

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    const handleOnclose = () => {
        formik.resetForm();
        onClose && onClose();
        setShow(false);
    };

    const formik = useFormik({
        validationSchema: validateSchema,
        initialValues: {
            name: "",
            description: "",
            stars: "",
            price: "",
            isAvailable: false,
            hotel: "",
        },
        onSubmit: (values) => {
            const newRoom = {
                ...values,
                stars: Number(values.stars),
                price: Number(values.price),
                hotelId: hotelSelected?.id || "",
            };

            if (room?.id) {
                updateRoomById(room.id, newRoom).then(() => {
                    handleOnclose();
                });
            } else {
                createRoom(newRoom).then(() => {
                    handleOnclose();
                });
            }
        },
    });

    useEffect(() => {
        const hotelName = hotels.find((hotel) => hotel.id === room?.hotelId)?.name || "";

        setHotelSelected(hotels.find((hotel) => hotel.id === room?.hotelId) || null);

        formik.values.name = room?.name || "";
        formik.values.description = room?.description || "";
        formik.values.stars = String(room?.stars || "0");
        formik.values.price = String(room?.price || "0");
        formik.values.isAvailable = !!room?.isAvailable;
        formik.values.hotel = hotelName || "";
    }, [room]);

    const handleChangeInput = (value: string) => {
        formik.handleChange("hotel")(value);
    };

    const handleSelectItem = (value: IHotel) => {
        setHotelSelected(value);
        formik.setFieldValue("hotel", value.name);
        formik.touched.hotel = false;
        formik.errors.hotel = undefined;
    };

    const handleClearInput = () => {
        formik.setFieldValue("hotel", "");
        formik.touched.hotel = true;
    };

    const handleOnBlur = () => {
        formik.handleBlur("hotel");

        if (typeof formik.values.hotel === "string") {
            formik.setFieldTouched("hotel", true);
            formik.setFieldValue("hotel", "");
        }
    };

    return (
        <Modal title={title} isOpen={show} onClose={handleOnclose}>
            <div className="w-full relative">
                {!!room && (
                    <picture className="rounded-full w-32 h-32 overflow-hidden border-[5px] border-white absolute z-[60] top-[-140px] left-[50%] translate-x-[-50%]">
                        <img
                            src={!!room?.imageUrls && room.imageUrls.length >= 1 ? room.imageUrls[0] : DEFAULT_IMAGE}
                            alt={room.name}
                            className="w-full h-full object-cover"
                        />
                    </picture>
                )}

                <form className="grid grid-cols-2 gap-3" onSubmit={formik.handleSubmit}>
                    <div className="col-span-1">
                        <Input
                            readOnly={readOnly}
                            label="Nombre"
                            placeholder="Nombre de la habitación"
                            {...formik.getFieldProps("name")}
                        />
                    </div>

                    <div className="col-span-1">
                        <Input
                            readOnly={readOnly}
                            label="Estrellas"
                            placeholder="Estrellas de la habitación"
                            isInvalid={formik.touched.stars && !!formik.errors.stars}
                            messageError={formik.errors.stars}
                            {...formik.getFieldProps("stars")}
                        />
                    </div>

                    <div className="col-span-2">
                        <TextArea
                            readOnly={readOnly}
                            label="Descripción"
                            placeholder="Descripción de la habitación"
                            isInvalid={formik.touched.description && !!formik.errors.description}
                            messageError={formik.errors.description}
                            {...formik.getFieldProps("description")}
                        />
                    </div>

                    <div className="col-span-1">
                        <Input
                            readOnly={readOnly}
                            label="Precio"
                            placeholder="Precio de la habitación"
                            isInvalid={formik.touched.price && !!formik.errors.price}
                            messageError={formik.errors.price}
                            {...formik.getFieldProps("price")}
                        />
                    </div>

                    <div className="col-span-1">
                        <Autocomplete
                            readOnly={readOnly}
                            label="Hotel"
                            placeholder="Hotel de la habitación"
                            filterBy="name"
                            items={hotels}
                            preValue={formik.values.hotel as string}
                            isInvalid={formik.touched.hotel && !!formik.errors.hotel}
                            messageError={formik.errors.hotel}
                            onChangeInput={handleChangeInput}
                            onSelectItem={handleSelectItem}
                            onClearInput={handleClearInput}
                            onBlur={handleOnBlur}
                        />
                    </div>

                    <div className="col-span-2">
                        <CheckBox
                            readOnly={readOnly}
                            label="Disponible"
                            checked={formik.values.isAvailable}
                            isInvalid={formik.touched.isAvailable && !!formik.errors.isAvailable}
                            messageError={formik.errors.isAvailable}
                            {...formik.getFieldProps("isAvailable")}
                        />
                    </div>

                    <div className="col-span-2 flex justify-end items-center">
                        <div className="flex gap-4">
                            <button
                                type="reset"
                                className="text-red-800 border border-red-800 px-7 py-2 flex justify-center items-center flex-nowrap gap-2 rounded-md hover:bg-red-800 hover:text-white hover:shadow-md hover:shadow-red-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                onClick={handleOnclose}
                            >
                                Cancelar
                            </button>

                            {!readOnly && (
                                <button
                                    type="submit"
                                    className="bg-emerald-800 text-white px-7 py-2 flex justify-center items-center flex-nowrap gap-2 rounded-md hover:bg-emerald-900 hover:shadow-md hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    Guardar
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default RoomForm;
