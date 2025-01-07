import { ReactNode } from "react";

interface IPrpos {
  columns: string[];
  children?: ReactNode;
}

export const Table = ({columns, children}: IPrpos) => {
  const renderColumns = columns.map((column, idx) => (
    <th key={idx} scope="col" className="px-6 py-3">
      {column}
    </th>
  ));
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>{renderColumns}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}