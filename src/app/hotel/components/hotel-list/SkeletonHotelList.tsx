import { StartIcon } from "@components/Icons";
import { DEFAULT_IMAGE } from "@/hooks/useRandomImage/useRandomImage";
import { FC } from "react";
import { array } from "yup";

interface IProps {}

const SkeletonHotelList: FC<IProps> = () => {
    return (
        <>
            <div className="mt-4 p-2 grid grid-cols-1 gap-y-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-zinc-50 flex flex-col md:flex-row rounded-md shadow-md"
                    >
                        <picture className="w-full max-h-60 md:max-h-full bg-gray-400 animate-pulse max-w-[14rem]">
                            {/* <img
                                src={DEFAULT_IMAGE}
                                alt="default image"
                                className="object-cover w-full h-full md:max-w-[20rem]"
                            /> */}
                        </picture>

                        <div className="p-4 h-full w-full flex flex-col gap-2">
                            <h1 className="text-4xl font-bold bg-gray-400 min-h-[2.5rem] animate-pulse">
                                {/* Lorem ipsum dolor sit amet, consectetur */}
                            </h1>
                            <p className="h-20 max-h-sm w-full min-w-full max-w-lg bg-gray-400 animate-pulse">
                                {/* Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Eligendi eveniet sit tempore
                                hic recusandae libero? Optio est accusantium
                                delectus officiis possimus cumque modi magnam
                                numquam. Excepturi optio perspiciatis sit nemo. */}
                            </p>
                            <p className="text-2xl mt-2 text-right self-end text-gray-400 flex flex-nowrap gap-2 animate-pulse">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <StartIcon key={index} />
                                ))}
                            </p>

                            <div>
                                <button className="mt-2 py-2 px-4 min-w-[7rem] min-h-[1.8rem] bg-gray-400 animate-pulse rounded-md">
                                    {/* Reservar ahora */}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SkeletonHotelList;
