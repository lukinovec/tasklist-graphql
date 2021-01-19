import { useDroppable } from '@dnd-kit/core';

export function DeleteTask(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'delete-droppable',
    });

    return (
        <section ref={setNodeRef} className={"flex flex-col items-center text-center justify-center flex-1 p-2 font-bold bg-red-500 select-none lg:p-4 bg-opacity-80 text-gray-50 h-5/6 " + props.className}>
            <span className="hidden lg:block">
                Drag to delete
                    </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="46.15px" viewBox="0 0 24 24" className="icon-trash"><path className="fill-current text-gray-50" d="M5 5h14l-.89 15.12a2 2 0 0 1-2 1.88H7.9a2 2 0 0 1-2-1.88L5 5zm5 5a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1z" /><path className="fill-current text-gray-50" d="M8.59 4l1.7-1.7A1 1 0 0 1 11 2h2a1 1 0 0 1 .7.3L15.42 4H19a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2h3.59z" /></svg>
        </section>
    )
}
export function CompleteTask(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'complete-droppable',
    });

    return (
        <section ref={setNodeRef} className={"flex-col items-center text-center justify-center p-2 font-bold bg-green-500 select-none lg:p-4 bg-opacity-80 text-gray-50 h-5/6 " + props.className}>
            <span className="hidden lg:block">
                Drag to complete
                    </span>
            <div className="text-5xl">
                ✓
                    </div>
        </section>
    )
}