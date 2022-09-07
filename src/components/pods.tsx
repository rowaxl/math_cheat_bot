import { Pod } from "../libs/type"
import PodCard from "./podCard"

interface PodsProps {
  pods?: Pod[]
}

const Pods = ({ pods }: PodsProps) => {
  return (
    <div className={`w-full flex flex-col flex-1 overflow-scroll mt-4`}>
      {
        pods &&
        pods.map(pod => <PodCard key={pod.title} pod={pod} />)
      }
    </div>
  )
}

export default Pods
