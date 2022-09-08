import { useState } from "react"
import { Pod } from "../libs/type"

interface PodCardProps {
  pod: Pod
}

const PodCard = ({ pod }: PodCardProps) => {
  const subpod = pod.subpods[0]
  const [showImage, setShowImage] = useState(true)
  const handleOnErrorImage = () => {
    setShowImage(false)
  }

  return (
    <div className="card card-compact w-full bg-base-200 mb-4">
      {
        subpod.img &&
        showImage &&
        <figure className={`bg-white flex py-4 px-2`}>
          <img
            src={subpod.img.src}
            alt={subpod.img.alt}
            width={subpod.img.width}
            height={subpod.img.height}
            onError={handleOnErrorImage}
          />
        </figure>
      }
      <div className="card-body">
        <h2 className="card-title">
          {pod.title}
        </h2>
        <p>
          {subpod.plaintext}
        </p>
      </div>
    </div>
  )
}

export default PodCard
