"use client";

import { signup } from "../actions/auth";
import { useState } from "react";
import { SignupFormSchema } from "@/lib/definitions"; // Import the schema for validation

export function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({}); // State for errors
  const [pending, setPending] = useState(false); // State for pending status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Update form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true); // Set pending to true while processing

    // Validate the form data
    const validation = SignupFormSchema.safeParse(formData);
    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors); // Set errors if validation fails
      setPending(false); // Reset pending status
      return;
    }

    // Call the signup action (you can replace this with your actual signup logic)
    const result = await signup(formData);
    if (result.errors) {
      setErrors(result.errors); // Set errors from the signup action
    } else {
      // Handle successful signup (e.g., redirect or show success message)
    }
    setPending(false); // Reset pending status
  };

  return (
    <form
      className="bg-white mt-38 p-6 rounded-2xl shadow-xl max-w-sm w-full space-y-6"
      onSubmit={handleSubmit}
    >
      <h2
        className="text-2xl text-center text-[#c83078]"
        style={{ fontFamily: "Motley Forces, sans-serif" }}
      >
        register here
      </h2>

      {/* First Name */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c83078] transition"
        />
        {errors.firstName && (
          <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c83078] transition"
        />
        {errors.lastName && (
          <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="johndoe@example.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c83078] transition"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full text-white font-semibold py-2 rounded-lg transition duration-200 ${
          pending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#c83078] hover:bg-pink-700"
        }`}
        disabled={pending}
      >
        {pending ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}
