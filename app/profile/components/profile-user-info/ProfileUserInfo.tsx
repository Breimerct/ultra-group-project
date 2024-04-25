"use client";

import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserStore } from "@/app/store/user-store/user.store";
import { DOCUMENTS_TYPE } from "@/const/mocks";
import Select from "@components/select/Select";
import { EditIcon } from "@components/Icons";
import Input from "@components/input/Input";
import { Gender, IUser } from "@/types";
import useCurrentUser from "@/hooks/current-user/useCurrentUser";

const ProfileUserInfo: FC = () => {
    const { updateUser } = useUserStore();
    const user = useCurrentUser();
    const [readOnly, setReadOnly] = useState(true);

    const handleEdit = () => {
        setReadOnly((prevValue) => !prevValue);
    };

    const initialValues = {
        name: "",
        email: "",
        cellphone: "",
        gender: "",
        documentType: "",
        documentNumber: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("El campo es requerido."),
        cellphone: Yup.string().required("El campo es requerido."),
        email: Yup.string()
            .email("Dirección de Email invalida.")
            .required("El campo es requerido."),
        gender: Yup.string().required("El genero es obligatorio"),
        documentType: Yup.string().required("El tipo de documento es obligatorio"),
        documentNumber: Yup.string().required("El numero de documento es obligatorio"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const userDto: Partial<IUser> = {
                name: values.name,
                email: values.email,
                cellphone: values.cellphone,
                gender: values.gender,
                documentType: values.documentType,
                documentNumber: values.documentNumber,
            };

            if (user?._id) {
                const result = await updateUser(user._id, userDto);

                if (result) {
                    setReadOnly(true);
                }

                if (!result) {
                    formik.setErrors({
                        email: "El email ya esta en uso",
                    });
                }
            }
        },
    });

    const initData = () => {
        formik.setFieldValue("name", user?.name || "");
        formik.setFieldValue("email", user?.email || "");
        formik.setFieldValue("cellphone", user?.cellphone || "");
        formik.setFieldValue("gender", user?.gender || "");
        formik.setFieldValue("documentType", user?.documentType?.toLowerCase() || "");
        formik.setFieldValue("documentNumber", user?.documentNumber || "");
    };

    useEffect(() => {
        initData();
    }, [user]);

    const handleCancel = () => {
        initData();
        setReadOnly(true);
        formik.errors = {};
    };

    return (
        <>
            <div className="flex flex-nowrap justify-between">
                <h1 className="col-span-2 text-2xl font-semibold mb-3">
                    Datos del usuario
                </h1>
                <button
                    className="mr-4 text-emerald-800 bg-zinc-300 p-2 rounded-full disabled:text-zinc-700/60 disabled:bg-slate-300/40 disabled:cursor-not-allowed disabled:shadow-none hover:scale-105 hover:shadow-md hover:shadow-zinc-500 transition-all"
                    disabled={!readOnly}
                    onClick={handleEdit}
                >
                    <EditIcon />
                </button>
            </div>

            <form
                className="grid grid-cols-1 lg:grid-cols-2 gap-3"
                onSubmit={formik.handleSubmit}
            >
                <div className="col-span-1">
                    <Input
                        label="Nombre"
                        readOnly={readOnly}
                        isInvalid={formik.touched.name && !!formik.errors.name}
                        messageError={formik.errors.name}
                        placeholder="Ingrese su nombre"
                        {...formik.getFieldProps("name")}
                    />
                </div>

                <div className="col-span-1">
                    <Input
                        label="Email"
                        readOnly={readOnly}
                        isInvalid={formik.touched.email && !!formik.errors.email}
                        messageError={formik.errors.email}
                        placeholder="Ingrese su email"
                        {...formik.getFieldProps("email")}
                    />
                </div>

                <div className="col-span-1">
                    <Input
                        label="Teléfono"
                        readOnly={readOnly}
                        isInvalid={formik.touched.cellphone && !!formik.errors.cellphone}
                        messageError={formik.errors.cellphone}
                        placeholder="Ingrese su teléfono"
                        {...formik.getFieldProps("cellphone")}
                    />
                </div>

                <div className="col-span-1">
                    <Select
                        label="Genero"
                        readOnly={readOnly}
                        isInvalid={formik.touched.gender && !!formik.errors.gender}
                        messageError={formik.errors.gender}
                        {...formik.getFieldProps("gender")}
                    >
                        <option value="">Genero</option>
                        <option value={Gender.Male}>Masculino</option>
                        <option value={Gender.Male}>Femenino</option>
                    </Select>
                </div>

                <div className="col-span-1">
                    <Select
                        label="Tipo de documento"
                        readOnly={readOnly}
                        isInvalid={
                            formik.touched.documentType && !!formik.errors.documentType
                        }
                        messageError={formik.errors.documentType}
                        {...formik.getFieldProps("documentType")}
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
                        readOnly={readOnly}
                        isInvalid={
                            formik.touched.documentNumber &&
                            !!formik.errors.documentNumber
                        }
                        messageError={formik.errors.documentNumber}
                        placeholder="Ingrese su documento"
                        {...formik.getFieldProps("documentNumber")}
                    />
                </div>

                {!readOnly && (
                    <div className="col-span-2 flex justify-end items-center gap-3">
                        <button
                            className="bg-emerald-800 text-white px-7 py-2 flex justify-center items-center flex-nowrap gap-2 rounded-md hover:bg-emerald-900 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                            type="submit"
                        >
                            Guardar
                        </button>

                        <button
                            className="grid place-content-center px-7 py-2 rounded-md outline outline-1 outline-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                            type="reset"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </form>
        </>
    );
};

export default ProfileUserInfo;
