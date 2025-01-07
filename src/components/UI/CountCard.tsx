interface IProps {
  title: string;
  description: string;
  count: number;
}

const CountCard = ({ title, description, count }: IProps) => {
  return (
    <div className="w-full h-fit bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
        <p className="bg-blue-500 text-white p-2 min-w-16 h-16 flex items-center justify-center rounded-full lg:text-3xl font-semibold">
          {count}
        </p>
      </div>
    </div>
  );
};

export default CountCard;
