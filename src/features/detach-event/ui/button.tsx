import { trpc } from "@/shared/api";

type DetachEventButtonProps = {
  eventId: number;
  onSuccess?: () => void;
};

export const DetachEventButton = ({
  eventId,
  onSuccess,
}: DetachEventButtonProps) => {
  const { mutate } = trpc.event.detach.useMutation({ onSuccess });

  const handleClick = () => {
    mutate({ id: eventId });
  };

  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-red-400 text-white"
      onClick={handleClick}
    >
      Отсоединится
    </button>
  );
};
