"use client";

import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useBookingStore } from "@store/booking-store/booking.store";
import { IEmergencyContact } from "@services/bookings.service";
import { EditIcon } from "@components/Icons";
import Input from "@components/input/Input";

interface IProps {}

const validationSchema = Yup.object<IEmergencyContact>({
    name: Yup.string().required("El campo es requerido."),

    cellphone: Yup.string()
        .required("El campo es requerido.")
        .matches(/^[0-9]+$/, "Solo se aceptan números.")
        .min(10, "El número de celular debe tener 10 dígitos.")
        .max(10, "El número de celular debe tener 10 dígitos."),
});

const EmergencyContact: FC<IProps> = () => {
    const { setBookingDto, bookingDto } = useBookingStore();
    const [isEdit, setIsEdit] = useState(true);

    const handleEdit = () => {
        setIsEdit((prevValue) => !prevValue);
    };

    const formik = useFormik<IEmergencyContact>({
        initialValues: {
            name: "",
            cellphone: "",
        },
        validationSchema,
        onSubmit: (values) => {
            setBookingDto({
                ...bookingDto,
                emergencyContact: values,
            });
            setIsEdit(false);
        },
    });

    useEffect(() => {
        if (
            !bookingDto.emergencyContact?.name ||
            !bookingDto.emergencyContact?.cellphone
        ) {
            formik.resetForm();
            setIsEdit(true);
        }

        return () => {};
    }, [bookingDto]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold mb-3">Contacto de emergencia</h3>
                <button
                    className="mr-4 text-emerald-800 bg-zinc-300 p-2 rounded-full disabled:text-zinc-700/60 disabled:bg-slate-300/40 disabled:cursor-not-allowed disabled:shadow-none hover:scale-105 hover:shadow-md hover:shadow-zinc-500 transition-all"
                    disabled={isEdit}
                    onClick={handleEdit}
                >
                    <EditIcon />
                </button>
            </div>
            <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                <div>
                    <Input
                        readOnly={!isEdit}
                        label="Nombre completo"
                        placeholder="Nombre completo"
                        isInvalid={!!formik.errors.name && formik.touched.name}
                        messageError={formik.errors.name}
                        {...formik.getFieldProps("name")}
                    />
                </div>

                <div>
                    <Input
                        readOnly={!isEdit}
                        label="Teléfono"
                        placeholder="Teléfono"
                        isInvalid={formik.touched.cellphone && !!formik.errors.cellphone}
                        messageError={formik.errors.cellphone}
                        {...formik.getFieldProps("cellphone")}
                    />
                </div>

                <div>
                    <button
                        disabled={!isEdit}
                        type="submit"
                        className="rounded-md bg-emerald-800 text-white py-3 px-7 hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        Guardar contacto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmergencyContact;
