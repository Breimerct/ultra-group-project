"use client";
import { EditIcon } from "@components/Icons";
import Input from "@components/input/Input";
import { useBookingStore } from "@store/booking-store/booking.store";
import { useHotelStore } from "@store/hotel-store/hotel.store";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

interface IProps {}

const validationSchema = Yup.object({
    checkIn: Yup.string().required("El campo es requerido."),
    checkOut: Yup.string()
        .required("El campo es requerido.")
        .test("fechaMayor", "CheckOut debe ser mayor", function (checkOut) {
            const checkIn = this.parent.checkIn as string;
            if (!checkIn || !checkOut) {
                return true;
            }

            const fechaCheckIn = new Date(checkIn);
            const fechaCheckOut = new Date(checkOut);

            return fechaCheckOut >= fechaCheckIn;
        }),
});

const CheckDateForm: FC<IProps> = () => {
    const [isEdit, setIsEdit] = useState(true);
    const { setBookingDto, bookingDto } = useBookingStore();
    const { filterSearch } = useHotelStore();

    const handleEdit = () => {
        setIsEdit((prevValue) => !prevValue);
    };

    const formik = useFormik({
        initialValues: {
            checkIn: "",
            checkOut: "",
        },
        validationSchema,
        onSubmit: (values) => {
            setBookingDto({
                ...bookingDto,
                checkIn: values.checkIn,
                checkOut: values.checkOut,
            });
            setIsEdit(false);
        },
    });

    useEffect(() => {
        if (filterSearch.checkIn && filterSearch.checkOut) {
            setIsEdit(false);
            formik.values.checkIn = filterSearch.checkIn;
            formik.values.checkOut = filterSearch.checkOut;
        }

        return () => {};
    }, [filterSearch]);

    useEffect(() => {
        if (!bookingDto.checkIn && !bookingDto.checkOut) {
            formik.resetForm();
            setIsEdit(true);
        }

        return () => {};
    }, [bookingDto]);

    return (
        <>
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold mb-3">
                    {isEdit ? "Selecciona las fechas de tu estadía" : "Fechas seleccionadas"}
                </h3>
                <button
                    className="mr-4 text-emerald-800 bg-zinc-300 p-2 rounded-full disabled:text-zinc-700/60 disabled:bg-slate-300/40 disabled:cursor-not-allowed disabled:shadow-none hover:scale-105 hover:shadow-md hover:shadow-zinc-500 transition-all"
                    disabled={isEdit}
                    onClick={handleEdit}
                >
                    <EditIcon />
                </button>
            </div>
            <form
                className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full"
                onSubmit={formik.handleSubmit}
            >
                <div className="col-span-1">
                    <Input
                        readOnly={!isEdit}
                        label="Fecha de ingreso"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        isInvalid={!!formik.errors.checkIn && formik.touched.checkIn}
                        messageError={formik.errors.checkIn}
                        {...formik.getFieldProps("checkIn")}
                    />
                </div>

                <div className="col-span-1">
                    <Input
                        readOnly={!isEdit}
                        label="Fecha de salida"
                        type="date"
                        min={formik.values.checkIn}
                        isInvalid={!!formik.errors.checkOut && formik.touched.checkOut}
                        messageError={formik.errors.checkOut}
                        {...formik.getFieldProps("checkOut")}
                    />
                </div>

                <div className="w-full">
                    <button
                        disabled={!isEdit}
                        type="submit"
                        className="rounded-md bg-emerald-800 text-white py-3 px-7 hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        Guardar fechas
                    </button>
                </div>
            </form>
        </>
    );
};

export default CheckDateForm;
