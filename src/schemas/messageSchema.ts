import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, "Message must be minimum 1 length")
    .max(500, "Message must be maximum 500 length"),
});
