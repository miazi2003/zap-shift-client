import React from "react";
import serviceCenterData from "../../data/warehouses.json";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAuth from "../../hook/useAuth";
import axios from "axios";

const generateTrackingId = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  console.log(datePart);
  const random = "PCL-" + Math.floor(100000 + Math.random() * 900000);
  return `${random}-${datePart}`;
};

const AddParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const parcelType = watch("parcelType"); // watching the parcel type
  const senderRegion = watch("senderRegion"); // watching sender region
  const receiverRegion = watch("receiverRegion"); // watching receiver region

  const uniqueRegions = [...new Set(serviceCenterData.map((r) => r.region))];

  const matchRegions = (region) => {
    return serviceCenterData.filter((item) => item.region === region);
  };

  const onSubmit = (data) => {
    console.log("Submitting form:", data);

    const { parcelType, parcelWeight, senderRegion, receiverRegion } = data;
    const cost = calculateParcelCost(
      parcelType,
      parcelWeight,
      senderRegion,
      receiverRegion
    );
    const isWithinCity = senderRegion === receiverRegion;

    let breakdownHtml = "";

    if (parcelType === "document") {
      breakdownHtml = `
      <div style="text-align:left; font-size:14px; color:#333;">
        <h3 style="color:#03373d; margin-bottom:10px;">Parcel Details</h3>
        <p><strong>Parcel Type:</strong> Document</p>
        <p><strong>Delivery Type:</strong> ${
          isWithinCity ? "Within City" : "Outside City/District"
        }</p>
        <p><strong>Flat Cost:</strong> <span style="color:#caeb66; font-weight:bold;">${cost} ৳</span></p>
      </div>
    `;
    } else if (parcelType === "non-document") {
      const weight = parseFloat(parcelWeight);
      if (weight <= 3) {
        breakdownHtml = `
        <div style="text-align:left; font-size:14px; color:#333;">
          <h3 style="color:#03373d; margin-bottom:10px;">Parcel Details</h3>
          <p><strong>Parcel Type:</strong> Non-Document</p>
          <p><strong>Delivery Type:</strong> ${
            isWithinCity ? "Within City" : "Outside City/District"
          }</p>
          <p><strong>Parcel Weight:</strong> ${weight} kg</p>
          <p><strong>Base Cost (up to 3 kg):</strong> <span style="color:#caeb66; font-weight:bold;">${cost} ৳</span></p>
        </div>
      `;
      } else {
        const extraKg = weight - 3;
        const baseCost = isWithinCity ? 110 : 150;
        const additionalCost = extraKg * 40;
        breakdownHtml = `
        <div style="text-align:left; font-size:14px; color:#333;">
          <h3 style="color:#03373d; margin-bottom:10px;">Parcel Details</h3>
          <p><strong>Parcel Type:</strong> Non-Document</p>
          <p><strong>Delivery Type:</strong> ${
            isWithinCity ? "Within City" : "Outside City/District"
          }</p>
          <p><strong>Parcel Weight:</strong> ${weight} kg</p>
          <p><strong>Base Cost (3 kg):</strong> ${baseCost} ৳</p>
          <p><strong>Extra Weight:</strong> ${extraKg} kg</p>
          <p><strong>Extra Weight Cost:</strong> ${additionalCost} ৳ (${extraKg} kg × 40 ৳)</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 10px 0;">
          <p style="font-size:16px;"><strong>Total Cost:</strong> <span style="color:#caeb66; font-weight:bold; font-size:18px;">${cost} ৳</span></p>
        </div>
      `;
      }
    } else {
      breakdownHtml = `<p style="color:red;">Parcel type not selected.</p>`;
    }

    Swal.fire({
      title: `<span style="color:#03373d; font-weight:bold;">Cost Breakdown</span>`,
      html: breakdownHtml,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Continue Editing",
      reverseButtons: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#6b7280",
      background: "#ffffff",
      width: "500px",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: cost,
          createdBy: user?.email,
          createdAt: new Date().toISOString(),
          paymentStatus: "unPaid",
          delivery_status: "notCollected",
          trackingId: generateTrackingId(),
        };
        //save data to db
        axios
          .post("http://localhost:3000/addParcel", parcelData)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                title: "Redirecting...",
                text: "Proceeding To Payment Gateway",
                icon: "success",
                timer : 1500,
                showConfirmButton: false
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
        console.log("Final submission data:", parcelData);
        // Add payment logic here if needed
      } else {
        toast("You can continue editing your parcel details.");
      }
    });
  };

  const calculateParcelCost = (
    parcelType,
    parcelWeight,
    senderRegion,
    receiverRegion
  ) => {
    const isWithinCity = senderRegion === receiverRegion;

    if (parcelType === "document") {
      return isWithinCity ? 60 : 80;
    } else if (parcelType === "non-document") {
      const weight = parseFloat(parcelWeight);
      if (weight <= 3) {
        return isWithinCity ? 110 : 150;
      } else {
        // > 3kg logic
        const extraKg = weight - 3;
        console.log(extraKg);
        let baseCost = isWithinCity ? 110 : 150;
        let additionalCost = extraKg * 40;
        console.log(additionalCost);

        return baseCost + additionalCost;
      }
    } else {
      return 0; // default if no parcel type selected
    }
  };

  return (
    <div className="bg-white max-w-7xl mx-auto py-12 px-24 rounded-3xl flex flex-col gap-4">
      <h1 className="text-4xl text-[#03373d] font-bold">Add Parcel</h1>
      <div className="border w-full border-gray-200 my-4"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        {/* Parcel Type */}
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="document"
              {...register("parcelType", { required: true })}
              className="hidden"
            />
            <span
              className={`w-5 h-5 rounded-full border-3 ${
                parcelType === "document"
                  ? "border-green-600"
                  : "border-gray-400"
              }`}
            ></span>
            <span className="text-gray-800">Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType", { required: true })}
              className="hidden"
            />
            <span
              className={`w-5 h-5 rounded-full border-3 ${
                parcelType === "non-document"
                  ? "border-green-600"
                  : "border-gray-400"
              }`}
            ></span>
            <span className="text-gray-800">Non Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="flex gap-14 items-center justify-between">
          <div className="w-1/2">
            <label className="label text-sm text-black font-bold">
              Parcel Name
            </label>
            <input
              type="text"
              className="border w-full border-gray-400 rounded px-4 py-1 mt-2"
              {...register("parcel-name", { required: true })}
              placeholder="Parcel name"
            />
            {errors["parcel-name"] && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="label text-sm text-black font-bold">
              Parcel Weight (KG)
            </label>
            <input
              type="text"
              className="border w-full border-gray-400 rounded px-4 py-1 mt-2"
              {...register("parcelWeight", {
                required: parcelType === "non-document",
                validate: (val) =>
                  parcelType !== "non-document" ||
                  (!isNaN(parseFloat(val)) && parseFloat(val) > 0) ||
                  "Must be a number",
              })}
              placeholder="Parcel Weight (KG)"
            />
            {errors["parcelWeight"] && (
              <p className="text-red-500 text-sm">
                {errors["parcelWeight"].message}
              </p>
            )}
          </div>
        </div>

        <div className="border w-full border-gray-200 my-4"></div>

        {/* Sender Section */}
        <div className="flex gap-12 justify-between">
          <div className="w-1/2">
            <h1 className="text-lg font-bold text-[#03373d]">Sender Details</h1>
            <div className="inputs grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="mb-1 text-sm font-medium text-gray-800">
                  Sender Name
                </label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  className="border rounded border-gray-300 px-2 text-sm h-8 w-full"
                  {...register("sender-name")}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Sender Warehouse</label>
                <select
                  disabled={!senderRegion}
                  className="border h-8 border-gray-300 text-gray-500 text-sm rounded block w-full"
                  {...register("sender-warehouse")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Warehouse
                  </option>
                  {matchRegions(senderRegion)?.map((item) => (
                    <option key={item.city} value={item.city}>
                      {item.city} ({item.district})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-800">
                  Sender Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="border rounded border-gray-300 px-2 text-sm h-8 w-full"
                  {...register("sender-address")}
                />
              </div>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-800">
                  Sender Contact Number
                </label>
                <input
                  type="text"
                  placeholder="Sender Contact Number"
                  className="border rounded border-gray-300 px-2 text-sm h-8 w-full"
                  {...register("sender-contact-number")}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm mb-1">Sender Region</label>
              <select
                {...register("senderRegion")}
                className="border h-8 border-gray-300 text-gray-500 text-sm rounded block w-full mb-2"
                defaultValue=""
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="mb-1 text-sm font-medium text-gray-800">
                Pick Up Instruction
              </label>
              <textarea
                className="border w-full rounded text-sm border-gray-300 py-2 px-2"
                {...register("pick-up-instruction")}
                placeholder="Pick Up Instruction"
              ></textarea>
            </div>
          </div>

          {/* Receiver Section */}
          <div className="w-1/2">
            <h1 className="text-lg font-bold text-[#03373d]">
              Receiver Details
            </h1>
            <div className="inputs grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="mb-1 text-sm font-medium text-gray-800">
                  Receiver Name
                </label>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  className="border rounded border-gray-300 px-2 text-sm h-8 w-full"
                  {...register("receiver-name")}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Receiver Warehouse</label>
                <select
                  disabled={!receiverRegion}
                  className="border h-8 border-gray-300 text-gray-500 text-sm rounded block w-full"
                  {...register("receiver-warehouse")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Warehouse
                  </option>
                  {matchRegions(receiverRegion)?.map((item) => (
                    <option key={item.city} value={item.city}>
                      {item.city} ({item.district})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-800">
                  Receiver Address
                </label>
                <input
                  type="text"
                  placeholder="Receiver Address"
                  className="border rounded border-gray-300 px-2 text-sm h-8 w-full"
                  {...register("receiver-address")}
                />
              </div>
              <div>
                <label className="mb-1 text-sm font-medium text-gray-800">
                  Receiver Contact Number
                </label>
                <input
                  type="text"
                  placeholder="Receiver Contact Number"
                  className="border rounded border-gray-300 px-2 text-sm h-8 w-full"
                  {...register("receiver-contact-number")}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm mb-1">Receiver Region</label>
              <select
                {...register("receiverRegion")}
                className="border h-8 border-gray-300 text-gray-500 text-sm rounded block w-full mb-2"
                defaultValue=""
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="mb-1 text-sm font-medium text-gray-800">
                Delivery Instruction
              </label>
              <textarea
                className="border w-full rounded text-sm border-gray-300 py-2 px-2"
                {...register("delivery-instruction")}
                placeholder="Delivery Instruction"
              ></textarea>
            </div>
          </div>
        </div>

        <div>
          <p>* PickUp Time 4pm–7pm Approx.</p>
        </div>
        <div>
          <button type="submit" className="btn bg-[#caeb66] px-16">
            Proceed To Confirm Bookings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParcel;
