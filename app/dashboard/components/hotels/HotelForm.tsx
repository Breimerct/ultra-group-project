"use client";
import Autocomplete from "@/app/components/autocomplete/Autocomplete";
import CheckBox from "@/app/components/checkbox/CheckBox";
import Input from "@/app/components/input/Input";
import Modal from "@/app/components/modal/Modal";
import TextArea from "@/app/components/textarea/TextArea";
import { useCommonStore } from "@/app/store/common-store/common.store";
import { FC, useEffect, useState } from "react";

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    isReady?: boolean;
}

const HotelForm: FC<IProps> = ({ isOpen, onClose }) => {
    const [show, setShow] = useState(isOpen);
    const { Cities } = useCommonStore();
    const [selectedOption, setSelectedOption] = useState("");

    const options = ["Opción 1", "Opción 2", "Opción 3", "Opción 4", "Opción 5"];

    const handleInputChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    const handleOnclose = () => {
        onClose && onClose();
        setShow(false);
    };

    return (
        <Modal title="Nuevo Hotel" isOpen={show} onClose={handleOnclose}>
            <div className="w-full">
                <header className="relative">
                    <figure className="rounded-full w-32 h-32 overflow-hidden absolute z-[60] top-0 left-[-50%] translate-x-[50%]">
                        <img
                            src="https://picsum.photos/seed/picsum/200/300"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </figure>
                </header>

                <form className="w-full grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                        <Input label="Nombre" placeholder="Nombre del hotel" />
                    </div>

                    <div className="col-span-1">
                        <Input label="Estrellas" placeholder="Estrellas del hotel" />
                    </div>

                    <div className="col-span-2">
                        <Autocomplete label="Ciudad" placeholder="Ciudad del hotel" items={Cities} filterBy="name" />
                    </div>

                    <div className="col-span-2">
                        <TextArea label="Descripción" placeholder="Descripción del hotel" />
                    </div>

                    {/* custom check with tailswindd */}
                    <div className="col-span-2">
                        <CheckBox label="¿Es un hotel activo?" />
                    </div>

                    <div className="col-span-2 flex justify-end items-center">
                        <div className="flex gap-4">
                            <button
                                className="text-red-800 border border-red-800 px-7 py-2 flex justify-center items-center flex-nowrap gap-2 rounded-md hover:bg-red-800 hover:text-white hover:shadow-md hover:shadow-red-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                onClick={handleOnclose}
                            >
                                Cancelar
                            </button>

                            <button className="bg-emerald-800 text-white px-7 py-2 flex justify-center items-center flex-nowrap gap-2 rounded-md hover:bg-emerald-900 hover:shadow-md hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none">
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default HotelForm;
