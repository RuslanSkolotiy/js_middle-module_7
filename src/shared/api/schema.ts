import { z } from "zod";

const eventObject = {
    title: z.string().min(1),
    description: z.string().optional(),
    date: z.coerce.date(),
};

export const CreateEventSchema = z.object(eventObject);

export const UpdateEventSchema = z.object({
    ...eventObject,
    id: z.number(),
});

export type CreateEventSchema = z.infer<typeof CreateEventSchema>;
export type UpdateEventSchema = z.infer<typeof UpdateEventSchema>;

export const JoinEventSchema = z.object({
    id: z.number().int().positive(),
});

export const DetachEventSchema = z.object({
    id: z.number().int().positive(),
});
