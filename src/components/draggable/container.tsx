import { defineComponent, onMounted, onUnmounted, onUpdated, reactive, ref } from 'vue'
import {
  ContainerOptions,
  DragEndParams,
  DragStartParams,
  dropHandlers,
  DropPlaceholderOptions,
  DropResult,
  smoothDnD
} from 'smooth-dnd'

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
smoothDnD.wrapChild = false

interface ContainerProps {
  behaviour: 'move' | 'copy' | 'drop-zone' | 'contain';
  groupName: string;
  orientation: 'vertical' | 'horizontal';
  dragHandleSelector: string;
  nonDragAreaSelector: string;
  dragBeginDelay: number;
  animationDuration: number;
  autoScrollEnabled: boolean;
  lockAxis: 'x' | 'y';
  dragClass: string;
  dropClass: string;
  removeOnDropOut: boolean;
  getChildPayload: (index: number) => any;
  shouldAnimateDrop: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
  shouldAcceptDrop: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
  tag: string;
  getGhostParent: () => HTMLElement;
  dropPlaceholder: DropPlaceholderOptions | boolean;
  onDrop: (params: DropResult) => void;
  onDragStart: (params: DragStartParams) => void;
  onDragEnd: (params: DragEndParams) => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDropReady: (params: DropResult) => void;
}

const Container = defineComponent<ContainerProps>({
  name: 'Container',
  emits: ['drop', 'dragStart', 'dragEnd', 'dragEnter', 'dragLeave', 'dropReady'],
  setup (props, { slots }) {
    const rootRef = ref()

    const data = reactive({
      container: ref()
    })

    onMounted(() => {
      data.container = smoothDnD(rootRef.value, props)
    })

    onUpdated(() => {
      data.container.setOptions(props)
    })

    onUnmounted(() => {
      if (data.container) data.container.dispose()
    })

    return () => {
      const Tag = props.tag

      return <Tag ref={rootRef}>{slots.default?.()}</Tag>
    }
  }
})

Container.props = {
  behaviour: String,
  groupName: String,
  orientation: String,
  dragHandleSelector: String,
  nonDragAreaSelector: String,
  dragBeginDelay: Number,
  animationDuration: Number,
  autoScrollEnabled: { type: Boolean, default: true },
  lockAxis: String,
  dragClass: String,
  dropClass: String,
  removeOnDropOut: { type: Boolean, default: false },
  getChildPayload: Function,
  shouldAnimateDrop: Function,
  shouldAcceptDrop: Function,
  tag: {
    type: String,
    default: 'div'
  },
  getGhostParent: Function,
  dropPlaceholder: [Object, Boolean],
  onDrop: Function,
  onDragStart: Function,
  onDragEnd: Function,
  onDragEnter: Function,
  onDragLeave: Function,
  onDropReady: Function
}

export default Container
