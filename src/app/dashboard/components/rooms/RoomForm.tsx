"use client";

import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { DEFAULT_IMAGE } from "@/hooks/useRandomImage/useRandomImage";
import { useCommonStore } from "@store/common-store/common.store";
import { useHotelStore } from "@store/hotel-store/hotel.store";
import { useRoomStore } from "@store/room-store/room.store";
import Autocomplete from "@components/autocomplete/Autocomplete";
import CheckBox from "@components/checkbox/CheckBox";
import TextArea from "@components/textarea/TextArea";
import Select from "@components/select/Select";
import Input from "@components/input/Input";
import Modal from "@components/modal/Modal";
import { IHotel, IRoom } from "@/types";

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    room: IRoom | null;
    title?: string;
    readOnly?: boolean;
}

const validateSchema = Yup.object({
    nameRoom: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    stars: Yup.number()
        .required("Las estrellas son requeridas")
        .max(5, "Las estrellas deben ser menor a 5"),
    price: Yup.number()
        .required("El precio es requerido")
        .min(0, "El precio debe ser mayor a 0"),
    isAvailable: Yup.boolean(),
    hotel: Yup.string().required("El hotel es requerido"),
    categoryId: Yup.string().required("La categoría es requerida"),
});

const RoomForm: FC<IProps> = ({
    isOpen,
    room,
    onClose,
    title = "Nueva Habitación",
    readOnly,
}) => {
    const { hotels } = useHotelStore();
    const { updateRoomById, createRoom } = useRoomStore();
    const [show, setShow] = useState(isOpen);
    const [hotelSelected, setHotelSelected] = useState<IHotel | null>(null);
    const { categories, getAllCategories } = useCommonStore();

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleOnclose = () => {
        formik.resetForm();
        onClose && onClose();
        setShow(false);
    };

    const formik = useFormik({
        validationSchema: validateSchema,
        initialValues: {
            nameRoom: "",
            description: "",
            stars: "",
            price: "",
            isAvailable: false,
            hotel: "",
            categoryId: "",
        },
        onSubmit: (values) => {
            const newRoom = {
                ...values,
                name: values.nameRoom,
                stars: Number(values.stars),
                price: Number(values.price),
                hotelId: hotelSelected?._id || "",
            };

            if (room?._id) {
                updateRoomById(room._id, newRoom).then(() => {
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
        const hotelName =
            hotels.find((hotel) => hotel._id?.toString() === room?.hotelId)?.name || "";

        setHotelSelected(
            hotels.find((hotel) => hotel._id?.toString() === room?.hotelId) || null,
        );

        formik.values.nameRoom = room?.name || "";
        formik.values.description = room?.description || "";
        formik.values.stars = String(room?.stars || "");
        formik.values.price = String(room?.price || "");
        formik.values.isAvailable = !!room?.isAvailable;
        formik.values.hotel = hotelName || "";
        formik.values.categoryId = room?.categoryId || "";
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
                            src={
                                !!room?.imageUrls && room.imageUrls.length >= 1
                                    ? room.imageUrls[0]
                                    : DEFAULT_IMAGE
                            }
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
                            isInvalid={
                                formik.touched.nameRoom && !!formik.errors.nameRoom
                            }
                            messageError={formik.errors.nameRoom}
                            {...formik.getFieldProps("nameRoom")}
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
                        <Select
                            label="Categoria"
                            readOnly={readOnly}
                            isInvalid={
                                formik.touched.categoryId && !!formik.errors.categoryId
                            }
                            messageError={formik.errors.categoryId}
                            {...formik.getFieldProps("categoryId")}
                        >
                            <option value="">Seleccione una categoría</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.category}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="col-span-2">
                        {!readOnly ? (
                            <TextArea
                                readOnly={readOnly}
                                label="Descripción"
                                placeholder="Descripción de la habitación"
                                rows={4}
                                isInvalid={
                                    formik.touched.description &&
                                    !!formik.errors.description
                                }
                                messageError={formik.errors.description}
                                {...formik.getFieldProps("description")}
                            />
                        ) : (
                            <div className="outline-none rounded-md border-2 border-solid p-2 w-full border-zinc-500/20 text-zinc-600/70">
                                {formik.values.description}
                            </div>
                        )}
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
                            isInvalid={
                                formik.touched.isAvailable && !!formik.errors.isAvailable
                            }
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
