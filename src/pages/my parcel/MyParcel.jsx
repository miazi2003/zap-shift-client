import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import Swal from "sweetalert2";
const MyParcel = () => {
  const { user } = useAuth();

  const {
    data: parcels = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/myParcel?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/deleteParcel/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cant Delete The Item!",
              });
            }

            refetch();
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire({
              icon: "error",
              title: "Delete Failed",
              text: err.message || "Something went wrong",
            });
          });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 mt-8">
        Something went wrong while fetching parcels.
      </div>
    );

  if (!parcels?.length)
    return (
      <div className="text-center text-gray-600 mt-8">
        No parcels found for your account.
      </div>
    );

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Parcels</h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r bg-[#caeb66] text-[#03373d] uppercase text-xs sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Tracking ID</th>
              <th className="px-3 py-2 text-left">Parcel Name</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Weight (kg)</th>
              <th className="px-3 py-2 text-left">Cost (৳)</th>

              <th className="px-3 py-2 text-left">Delivery-Status</th>
              <th className="px-3 py-2 text-left">Payment-Status</th>
              <th className="px-3 py-2 text-left">Created At</th>
              <th className="px-3 py-2 text-left">Operations</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="hover:bg-[#f1f9f8] border-b border-gray-200"
              >
                <td className="px-3 py-2 font-bold text-gray-900 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-3 py-2 font-bold text-gray-900 whitespace-nowrap">
                  {parcel.trackingId}
                </td>
                <td className="px-3 py-2 capitalize">
                  {parcel["parcel-name"]}
                </td>
                <td className="px-3 py-2 capitalize">{parcel.parcelType}</td>
                <td className="px-3 py-2 capitalize">
                  {parcel.parcelWeight || "-"}
                </td>
                <td className="px-3 py-2 capitalize">{parcel.cost}</td>

                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      parcel.delivery_status === "notCollected"
                        ? "bg-yellow-100 text-yellow-800"
                        : parcel.delivery_status === "collected"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {parcel.delivery_status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      parcel.paymentStatus === "unPaid"
                        ? "bg-yellow-100 text-yellow-800"
                        : parcel.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {new Date(parcel.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="flex items-center justify-center gap-4 px-3 py-2">
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    
                    aria-label="Delete Parcel"
                  >
                    <MdOutlineDeleteOutline className="text-red-600 hover:scale-110" />
                  </button>
                  {/* <button onClick={() => handleEdit(parcel._id)} title="Pay">
                    <MdPayment className="text-blue-600 hover:scale-110" />
                  </button>
                  <button onClick={() => handleView(parcel._id)} title="Show">
                    <BiSolidShow className="text-green-600 hover:scale-110" />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
