import { FC } from "react";
import { IEmergencyContact } from "@services/bookings.service";
import Input from "@components/input/Input";

interface IProps {
    emergencyContact?: IEmergencyContact;
}

const ContactEmergency: FC<IProps> = ({ emergencyContact }) => {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <Input
                    readOnly
                    label="Nombre completo"
                    value={emergencyContact?.name ?? "-"}
                />
            </div>

            <div>
                <Input
                    readOnly
                    label="Teléfono"
                    value={emergencyContact?.cellphone ?? "-"}
                />
            </div>
        </div>
    );
};

export default ContactEmergency;
