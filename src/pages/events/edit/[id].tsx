import { CreateEventForm } from "@/features/create-event";
import { UpdateEventForm } from "@/features/update-event";
import { CreateEventSchema, trpc } from "@/shared/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function EditEvent() {
    const router = useRouter();
    const session = useSession();

    const { data, isLoading } = trpc.event.findUnique.useQuery({
        id: Number(router.query.id),
    });

    const { mutate } = trpc.event.update.useMutation({
        onSuccess: (data) => {
            router.push(`/events/${data.id}`);
        },
    });

    const handleSubmit = (data: CreateEventSchema) => {
        mutate({ ...data, id: Number(router.query.id) });
    };

    if (!data) {
        return "No data";
    }

    const formData = {
        title: data.title,
        description: data.description || undefined,
        date: data.date,
    };

    return <UpdateEventForm onSubmit={handleSubmit} initialData={formData} />;
}
