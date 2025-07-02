import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Account Info", "Profile Info", "Review And Submit"];

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setDirection(1);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      alert("Submitted!");
      console.log("Final data:", formData);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (step > 0) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="mb-4">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </>
        );

      case 1:
        return (
          <>
            <div className="mb-4">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>First Name:</strong> {formData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {formData.lastName}
            </p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-center">{steps[step]}</h1>

      <form onSubmit={handleNext}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-between">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded ml-auto"
          >
            {step === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
