import { Pod } from "../libs/type"
import PodCard from "./podCard"

interface PodsProps {
  pods?: Pod[]
}

const NO_ANSWER_POD = {
  title: 'Sorry, No Answer Found',
  error: true,
  subpods: [
    {
      title: 'excueses',
      plaintext: 'We cannot found the answer you want... Try other questions'
    }
  ]
}

const Pods = ({ pods }: PodsProps) => {
  return (
    <div className={`w-full flex flex-col flex-1 overflow-scroll mt-4`}>
      {
        pods &&
        (
          pods.length > 0 ?
            pods.map(pod => <PodCard key={pod.title} pod={pod} />) :
            <PodCard pod={NO_ANSWER_POD} />
        )
      }
    </div>
  )
}

export default Pods
