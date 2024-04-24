import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Card = ({ id, text, index, moveCard }) => {
  // Need a ref to make that element draggable or dropable, in this case both
  // See near the bottom `drag(drop(ref))`
  const ref = useRef(null);

  // Handles the dropping logic
  // Card is droppable sink because the dragged card essentially
  // is put into the hovered card's location.
  const [{ handlerId }, drop] = useDrop({
    accept: 'CARD',
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  // Card is both draggable and droppable, I think this
  // is just the syntax of wrapping the ref.
  drag(drop(ref));

  return (
    <div
      data-handler-id={handlerId}
      ref={ref}
      style={{
        height: 200,
        width: 400,
        backgroundColor: isDragging ? 'aliceblue' : 'aliceblue',
        ...opacity,
      }}
    >
      {text}
    </div>
  );
};
export default Card;
