import type { FunctionalComponent, HTMLAttributes } from 'vue'
import { constants } from 'smooth-dnd'

interface DraggableProps extends HTMLAttributes {
  tag?: string;
}

const Draggable: FunctionalComponent<DraggableProps> = (props, { slots }) => {
  const Tag = props.tag || ('div' as any)
  return <Tag class={constants.wrapperClass}>{slots.default?.()}</Tag>
}

Draggable.displayName = 'Draggable'

export default Draggable
