
import { useState, useEffect } from "react";
function CommonTable({
    columns,
    data = [],
    actions,
   
}) {


 const [currentPage, setCurrentPage] = useState(1);

const pageSize = 10;

const totalRecords = data?.length;

const totalPages = Math.ceil(totalRecords / pageSize);

const paginatedData = Array.isArray(data)
    ? data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      )
    : [];

useEffect(() => {
    if (currentPage > Math.max(totalPages, 1)) {
        setCurrentPage(Math.max(totalPages, 1));
    }
}, [data, currentPage, totalPages]);

    return (
        <div className="bg-[#181b21] border border-[#2a2e36] rounded-xl overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                    <thead>
                        <tr className="bg-[#14171c] border-b border-[#2a2e36]">

                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    {col.label}
                                </th>
                            ))}

                            {actions && (
                                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            )}

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#252931]">

                        {paginatedData?.length > 0 ? (
                            paginatedData?.map((item, index) => (
                                <tr
                                    key={item._id || index}
                                    className="hover:bg-[#1e2229] transition"
                                >

                                    {columns.map((col, i) => (
                                        <td key={i} className="px-6 py-4">

                                            {col.render ? (
                                                col.render(item)
                                            ) : (
                                                <p className="text-sm font-medium text-gray-200">
                                                    {item[col.key] ?? "-"}
                                                </p>
                                            )}

                                        </td>
                                    ))}

                                    {actions && (
                                        <td className="px-6 py-4 text-right">
                                            {actions(item)}
                                        </td>
                                    )}

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="text-center py-10 text-gray-500"
                                >
                                    No data found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

            {/* Pagination */}

            <div className="h-[58px] px-6 border-t border-[#2a2e36] flex items-center justify-between">

                <p className="text-xs text-gray-500">
                    Showing {totalRecords === 0 ? 0 : (currentPage - 1) * 10 + 1}
                    {" "}to{" "}
                    {Math.min(currentPage * 10, totalRecords)}
                    {" "}of {totalRecords} records
                </p>

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="px-3 py-2 rounded-lg bg-[#252a36] text-xs text-gray-300 hover:bg-[#303644] disabled:opacity-30"
                    >
                        Previous
                    </button>

                    <span className="text-xs text-gray-400">
                        Page {currentPage} of {Math.max(totalPages, 1)}
                    </span>

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="px-3 py-2 rounded-lg bg-pink-500 text-xs text-white hover:bg-pink-600 disabled:opacity-30"
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CommonTable;