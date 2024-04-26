"use client";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { DOCUMENTS_TYPE } from "@/const/mocks";
import { useBookingStore } from "@store/booking-store/booking.store";
import Select from "@components/select/Select";
import Input from "@components/input/Input";
import { Gender, ICompanion, IRoom, IUser } from "@/types";

interface IProps {
    numberOfCompanions: number;
    user: IUser | null;
    room: IRoom | null;
}

interface IFormValues {
    companions: ICompanion[];
}

const initialValues: ICompanion = {
    name: "",
    email: "",
    cellphone: "",
    documentType: "",
    documentNumber: "",
    gender: null,
};

const validationSchema = Yup.object().shape({
    companions: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("El nombre es obligatorio"),
            email: Yup.string()
                .email("Formato de correo electrónico inválido")
                .required("El email es obligatorio"),
            gender: Yup.string().required("El genero es obligatorio"),
            documentType: Yup.string().required("El tipo de documento es obligatorio"),
            documentNumber: Yup.string().required("El numero de documento es obligatorio"),
            cellphone: Yup.string()
                .required("El numero de celular es obligatorio")
                .matches(/^[0-9]+$/, "Solo se aceptan números")
                .max(10, "El numero de celular debe tener 10 digitos"),
        }),
    ),
});

const BookingForm: FC<IProps> = ({ numberOfCompanions, user, room }) => {
    const [companions, setCompanions] = useState<(typeof initialValues)[]>([initialValues]);
    const [prevNumberOfCompanions, setPrevNumberOfCompanions] = useState(numberOfCompanions);
    const { bookingDto, createBooking, isLoading } = useBookingStore();
    const router = useRouter();

    const formik = useFormik<IFormValues>({
        initialValues: {
            companions: companions.map<ICompanion>((companion) => ({
                name: companion.name || "",
                email: companion.email || "",
                cellphone: companion.cellphone || "",
                documentType: companion.documentType || "",
                documentNumber: companion.documentNumber || "",
                gender: (companion.gender as Gender) || "",
            })),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const { emergencyContact, checkIn, checkOut } = bookingDto;

            if (!emergencyContact || !emergencyContact.name || !emergencyContact.cellphone) {
                toast.error("El contacto de emergencia es obligatorio");
                return;
            }

            if (!checkIn || !checkOut) {
                toast.error("Las fechas de ingreso y salida son obligatorias");
                return;
            }

            const dto = {
                ...bookingDto,
                companions: values.companions,
                userId: user?._id,
                roomId: room?._id,
            };

            createBooking(dto).then(() => router.push("/"));
        },
    });

    useEffect(() => {
        if (numberOfCompanions > prevNumberOfCompanions) {
            setCompanions((prevValue) => [...prevValue, initialValues]);
            formik.values.companions.push(initialValues);
        }

        if (numberOfCompanions < prevNumberOfCompanions) {
            setCompanions((prevValue) => prevValue.slice(0, -1));
            formik.values.companions.pop();
        }

        setPrevNumberOfCompanions(numberOfCompanions);

        return () => {};
    }, [numberOfCompanions, prevNumberOfCompanions]);

    useEffect(() => {
        if (!bookingDto?.companions) {
            formik.resetForm();
        }

        return () => {};
    }, [bookingDto]);

    const getValueByKey = (obj: any | null | undefined, key: string): string => {
        if (!obj || typeof obj !== "object") return "";
        return obj[key];
    };

    return (
        <>
            <form className="w-full" onSubmit={formik.handleSubmit}>
                {formik.values.companions.map((companion, index, arr) => (
                    <div key={index}>
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <div className="col-span-1">
                                <Input
                                    label="Nombre"
                                    type="text"
                                    placeholder="Ingrese su nombre"
                                    isInvalid={
                                        !!formik.touched.companions &&
                                        !!formik.errors.companions &&
                                        !!getValueByKey(
                                            formik.touched.companions[index],
                                            "name",
                                        ) &&
                                        !!getValueByKey(
                                            formik.errors.companions[index],
                                            "name",
                                        )
                                    }
                                    messageError={
                                        formik.errors.companions &&
                                        getValueByKey(formik.errors.companions[index], "name")
                                    }
                                    {...formik.getFieldProps(`companions[${index}].name`)}
                                />
                            </div>

                            <div className="col-span-1">
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Ingrese su Email"
                                    isInvalid={
                                        !!formik.touched.companions &&
                                        !!formik.errors.companions &&
                                        !!getValueByKey(
                                            formik.touched.companions[index],
                                            "email",
                                        ) &&
                                        !!getValueByKey(
                                            formik.errors.companions[index],
                                            "email",
                                        )
                                    }
                                    messageError={
                                        formik.errors.companions &&
                                        getValueByKey(formik.errors.companions[index], "email")
                                    }
                                    {...formik.getFieldProps(`companions[${index}].email`)}
                                />
                            </div>

                            <div className="col-span-1">
                                <Select
                                    label="Tipo de documento"
                                    isInvalid={
                                        !!formik.touched.companions &&
                                        !!formik.errors.companions &&
                                        !!getValueByKey(
                                            formik.touched.companions[index],
                                            "documentType",
                                        ) &&
                                        !!getValueByKey(
                                            formik.errors.companions[index],
                                            "documentType",
                                        )
                                    }
                                    messageError={
                                        formik.errors.companions &&
                                        getValueByKey(
                                            formik.errors.companions[index],
                                            "documentType",
                                        )
                                    }
                                    {...formik.getFieldProps(
                                        `companions[${index}].documentType`,
                                    )}
                                >
                                    <>
                                        <option value="">Tipo de documento</option>
                                        {DOCUMENTS_TYPE.map((document, index) => (
                                            <option key={index} value={document.id}>
                                                {document.name}
                                            </option>
                                        ))}
                                    </>
                                </Select>
                            </div>

                            <div className="col-span-1">
                                <Input
                                    label="Numero de documento"
                                    type="text"
                                    isInvalid={
                                        !!formik.touched.companions &&
                                        !!formik.errors.companions &&
                                        !!getValueByKey(
                                            formik.touched.companions[index],
                                            "documentNumber",
                                        ) &&
                                        !!getValueByKey(
                                            formik.errors.companions[index],
                                            "documentNumber",
                                        )
                                    }
                                    messageError={
                                        formik.errors.companions &&
                                        getValueByKey(
                                            formik.errors.companions[index],
                                            "documentNumber",
                                        )
                                    }
                                    placeholder="Ingrese su documento"
                                    {...formik.getFieldProps(
                                        `companions[${index}].documentNumber`,
                                    )}
                                />
                            </div>

                            <div className="col-span-1">
                                <Input
                                    label="Telefono"
                                    type="text"
                                    placeholder="Ingrese su telefono"
                                    isInvalid={
                                        !!formik.touched.companions &&
                                        !!formik.errors.companions &&
                                        !!getValueByKey(
                                            formik.touched.companions[index],
                                            "cellphone",
                                        ) &&
                                        !!getValueByKey(
                                            formik.errors.companions[index],
                                            "cellphone",
                                        )
                                    }
                                    messageError={
                                        formik.errors.companions &&
                                        getValueByKey(
                                            formik.errors.companions[index],
                                            "cellphone",
                                        )
                                    }
                                    {...formik.getFieldProps(`companions[${index}].cellphone`)}
                                />
                            </div>

                            <div className="col-span-1">
                                <Select
                                    label="Genero"
                                    isInvalid={
                                        !!formik.touched.companions &&
                                        !!formik.errors.companions &&
                                        !!getValueByKey(
                                            formik.touched.companions[index],
                                            "gender",
                                        ) &&
                                        !!getValueByKey(
                                            formik.errors.companions[index],
                                            "gender",
                                        )
                                    }
                                    messageError={
                                        formik.errors.companions &&
                                        getValueByKey(
                                            formik.errors.companions[index],
                                            "gender",
                                        )
                                    }
                                    {...formik.getFieldProps(`companions[${index}].gender`)}
                                >
                                    <option value="">Genero</option>
                                    <option value={Gender.Male}>Masculino</option>
                                    <option value={Gender.Male}>Femenino</option>
                                </Select>
                            </div>
                        </div>

                        {arr.length > 1 && index < arr.length - 1 && (
                            <hr className="mb-4 mt-6" />
                        )}
                    </div>
                ))}

                <div className="flex justify-end items-center mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-emerald-800 text-white py-3 hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all"
                    >
                        Reservar
                    </button>
                </div>
            </form>
        </>
    );
};

export default BookingForm;
