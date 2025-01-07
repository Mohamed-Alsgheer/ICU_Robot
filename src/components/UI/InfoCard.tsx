import { ReactNode } from 'react';

interface IProps {
  backgroundColor: string;
  iconBackgroundColor: string;
  icon: ReactNode;
  amount?: string;
  description?: string;
  note?: string;
}

const InfoCard = ({
  backgroundColor,
  iconBackgroundColor,
  icon,
  amount,
  description,
  note,
}: IProps) => {
  return (
    <div
      className="w-[220px] h-[220px] flex flex-col justify-around p-5 rounded-xl"
      style={{ backgroundColor }}
    >
      <div
        className="w-[50px] h-[50px] flex items-center justify-center rounded-full text-white text-xl"
        style={{ backgroundColor: iconBackgroundColor }}
      >
        {icon}
      </div>
      {amount ? <p className="text-[#000000] text-2xl font-bold capitalize">{amount}</p> : null}
      {description ? <p className="text-gray-800 text-lg capitalize">{description}</p> : null}
      {note ? <p className="text-blue-500 text-base capitalize">{note}</p> : null}
    </div>
  );
};

export default InfoCard;
