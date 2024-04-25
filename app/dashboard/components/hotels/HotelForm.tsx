"use client";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHotelStore } from "@store/hotel-store/hotel.store";
import { useCommonStore } from "@store/common-store/common.store";
import Autocomplete from "@components/autocomplete/Autocomplete";
import CheckBox from "@components/checkbox/CheckBox";
import TextArea from "@components/textarea/TextArea";
import Input from "@components/input/Input";
import Modal from "@components/modal/Modal";
import { ICity, IHotel } from "@/types";

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    readOnly?: boolean;
    hotel: IHotel | null;
    title?: string;
}

interface IFormValues {
    name: string;
    stars: string | null;
    city: string | number;
    description: string;
    isAvailable: boolean;
}

const HotelForm: FC<IProps> = ({
    isOpen,
    onClose,
    readOnly,
    hotel,
    title = "Nuevo Hotel",
}) => {
    const [show, setShow] = useState(isOpen);
    const { cities } = useCommonStore();
    const { createHotel, updateHotelById } = useHotelStore();
    const [citySelected, setCitySelected] = useState<ICity | null>(null);

    const formik = useFormik<IFormValues>({
        initialValues: {
            name: "",
            stars: "",
            city: "",
            description: "",
            isAvailable: false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es requerido"),
            stars: Yup.string()
                .required("Las estrellas son requeridas")
                .max(5, "Las estrellas deben ser menor a 5"),
            city: Yup.string().required("La ciudad es requerida"),
            description: Yup.string().required("La descripción es requerida"),
            isAvailable: Yup.boolean(),
        }),
        onSubmit: (values) => {
            const newHotel = {
                ...values,
                stars: Number(values.stars),
                cityId: Number(citySelected?.id),
            };

            if (hotel?._id) {
                updateHotelById(hotel._id?.toString(), newHotel).then(() => {
                    formik.resetForm();
                    onClose && onClose();
                    setShow(false);
                });
                return;
            }

            createHotel(newHotel).then(() => {
                formik.resetForm();
                onClose && onClose();
                setShow(false);
            });
        },
    });

    useEffect(() => {
        const cityName = cities.find((city) => city.id === hotel?.cityId)?.name || "";

        formik.values.name = hotel?.name || "";
        formik.values.stars = String(hotel?.stars ?? "");
        formik.values.city = cityName || "";
        formik.values.description = hotel?.description || "";
        formik.values.isAvailable = !!hotel?.isAvailable;
    }, [hotel]);

    const handleChangeInput = (value: string) => {
        formik.handleChange("city")(value);
    };

    const handleSelectItem = (city: ICity) => {
        setCitySelected(city);
        formik.setFieldValue("city", city.name);
        formik.touched.city = false;
        formik.errors.city = undefined;
    };

    const handleClearInput = () => {
        formik.setFieldValue("city", "");
        formik.touched.city = true;
    };

    const handleOnBlur = () => {
        formik.handleBlur("city");

        if (typeof formik.values.city === "string") {
            formik.setFieldTouched("city", true);
            formik.setFieldValue("city", "");
        }
    };

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    const handleOnclose = () => {
        formik.resetForm();
        onClose && onClose();
        setShow(false);
    };

    return (
        <Modal title={title} isOpen={show} onClose={handleOnclose}>
            <div className="w-full relative">
                {!!hotel && (
                    <picture className="rounded-full w-32 h-32 overflow-hidden border-[5px] border-white absolute z-[60] top-[-140px] left-[50%] translate-x-[-50%]">
                        <img
                            src={hotel.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </picture>
                )}

                <form
                    className="w-full grid grid-cols-2 gap-3"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="col-span-1">
                        <Input
                            readOnly={readOnly}
                            label="Nombre"
                            placeholder="Nombre del hotel"
                            isInvalid={formik.touched.name && !!formik.errors.name}
                            messageError={formik.errors.name}
                            {...formik.getFieldProps("name")}
                        />
                    </div>

                    <div className="col-span-1">
                        <Input
                            readOnly={readOnly}
                            label="Estrellas"
                            placeholder="Estrellas del hotel"
                            isInvalid={formik.touched.stars && !!formik.errors.stars}
                            messageError={formik.errors.stars}
                            {...formik.getFieldProps("stars")}
                        />
                    </div>

                    <div className="col-span-2">
                        <Autocomplete
                            readOnly={readOnly}
                            label="Ciudad"
                            placeholder="Ciudad del hotel"
                            items={cities}
                            filterBy="name"
                            preValue={formik.values.city as string}
                            isInvalid={formik.touched.city && !!formik.errors.city}
                            messageError={formik.errors.city}
                            onChangeInput={handleChangeInput}
                            onSelectItem={handleSelectItem}
                            onClearInput={handleClearInput}
                            onBlur={handleOnBlur}
                        />
                    </div>

                    <div className="col-span-2">
                        <TextArea
                            readOnly={readOnly}
                            label="Descripción"
                            placeholder="Descripción del hotel"
                            isInvalid={
                                formik.touched.description && !!formik.errors.description
                            }
                            messageError={formik.errors.description}
                            {...formik.getFieldProps("description")}
                        />
                    </div>

                    <div className="col-span-2">
                        <CheckBox
                            readOnly={readOnly}
                            label="¿Es un hotel activo?"
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

export default HotelForm;
