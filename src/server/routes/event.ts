import {
    CreateEventSchema,
    DetachEventSchema,
    JoinEventSchema,
    UpdateEventSchema,
} from "@/shared/api";
import { prisma } from "../db";
import { isAuth, procedure, router } from "../trpc";
import { z } from "zod";

export const eventRouter = router({
    findMany: procedure.query(async ({ ctx: { user } }) => {
        const events = await prisma.event.findMany({
            include: {
                participations: true,
            },
        });

        return events.map(({ participations, ...event }) => ({
            ...event,
            isJoined: participations.some(({ userId }) => userId === user?.id),
        }));
    }),
    findUnique: procedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .use(isAuth)
        .query(({ input }) => {
            return prisma.event.findUnique({
                where: input,
                select: {
                    id: true,
                    title: true,
                    description: true,
                    date: true,
                    participations: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    authorId: true,
                },
            });
        }),
    create: procedure
        .input(CreateEventSchema)
        .use(isAuth)
        .mutation(({ input, ctx: { user } }) => {
            return prisma.event.create({
                data: {
                    authorId: user.id,
                    ...input,
                },
            });
        }),
    update: procedure
        .input(UpdateEventSchema)
        .use(isAuth)
        .mutation(({ input, ctx: { user } }) => {
            return prisma.event.update({
                where: {
                    id: input.id,
                },
                data: {
                    authorId: user.id,
                    ...input,
                },
            });
        }),
    join: procedure
        .input(JoinEventSchema)
        .use(isAuth)
        .mutation(({ input, ctx: { user } }) => {
            return prisma.participation.create({
                data: {
                    eventId: input.id,
                    userId: user.id,
                },
            });
        }),
    detach: procedure
        .input(DetachEventSchema)
        .use(isAuth)
        .mutation(({ input, ctx: { user } }) => {
            return prisma.participation.delete({
                where: {
                    userId_eventId: {
                        eventId: input.id,
                        userId: user.id,
                    },
                },
            });
        }),
});
