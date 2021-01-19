import { useDraggable } from '@dnd-kit/core';

export function DraggableTask(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });

    const style = transform ? {
        zIndex: '50',
        display: 'none',
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={"flex cursor-move h-20 p-4 m-4 bg-gray-50 rounded-xl " + props.classes}>
            <span className="text-xl font-bold text-gray-900">
                {props.name}
            </span>
        </div>
    )
}

export function Task(props) {
    return (
        <div className={"flex cursor-move p-4 w-full bg-gray-50 rounded-xl"}>
            <span className="text-xl font-bold text-gray-900">
                {props.name}
            </span>
        </div>
    )
}