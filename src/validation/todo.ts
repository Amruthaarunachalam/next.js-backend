import {z} from "zod";
export const createTodo=z.object({
    title:z.string().min(1,"Title is required"),
    description:z.string().optional(),
    status:z.boolean().optional().default(false)
});
