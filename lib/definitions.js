import { z } from "zod";

export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .trim()
    .nonempty({ message: "First name is required." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .trim()
    .nonempty({ message: "Last name is required." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim()
    .nonempty({ message: "Email is required." }),
});
