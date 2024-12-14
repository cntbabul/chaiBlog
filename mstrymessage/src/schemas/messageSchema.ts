import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "content atleast 10 characters" })
    .max(300, { message: "content max 300 characters" }),
});
