import { RouterOutput } from "@/shared/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

type EventDetailProps = NonNullable<RouterOutput["event"]["findUnique"]>;

export const EventDetail = ({
    id,
    title,
    description,
    date,
    participations,
    authorId,
}: EventDetailProps) => {
    const session = useSession();

    const showEditBtn = authorId === session.data?.user.id;

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Информация о событии
                </h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Название
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {title}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Описание
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {description}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Дата проведения
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {date.toLocaleDateString()}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Участники
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {participations
                                .map(({ user }) => user.name)
                                .join(", ")}
                        </dd>
                    </div>
                    <div>
                        {showEditBtn && (
                            <Link
                                href={`/events/edit/${id}`}
                                className="h-10 px-6 font-semibold bg-black text-white rounded-md border border-slate-200 text-slate-900 align-middle leading-10"
                            >
                                Редактировать
                            </Link>
                        )}
                    </div>
                </dl>
            </div>
        </div>
    );
};
