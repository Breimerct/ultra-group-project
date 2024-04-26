"use client";
import { CloseIcon } from "@components/Icons";
import { FC, useEffect, useState } from "react";

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    title: string;
}

const Modal: FC<IProps> = ({ isOpen, onClose, children, title }) => {
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        setShow(isOpen);

        if (isOpen) {
            document.body.style.overflow = "hidden";
        }

        if (!isOpen) {
            document.body.style.overflow = "auto";
        }

        return () => {};
    }, [isOpen]);

    const handleOnclose = () => {
        onClose && onClose();
        setShow(false);
    };

    return (
        <div>
            {show && (
                <div className="fixed top-0 z-50 w-screen left-0 overflow-y-auto h-screen overflow-hidden flex justify-center items-center transition-all backdrop-blur-[5px] rounded-xl">
                    <div
                        className="block relative min-w-[10rem] bg-white rounded-xl text-left shadow-xl transform transition-all w-full max-w-xl"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full rounded-xl">
                            <header className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold">{title}</h3>
                                <button
                                    className="text-emerald-800 w-10 h-10 p-2 rounded-full hover:scale-105 hover:shadow-sm hover:shadow-zinc-500/60 transition-all"
                                    onClick={handleOnclose}
                                >
                                    <CloseIcon />
                                </button>
                            </header>

                            <div>{children}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
