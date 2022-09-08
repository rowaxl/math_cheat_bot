export interface Pod {
  title: string
  error: boolean
  primary?: boolean
  subpods: SubPod[]
}

export interface PodImg {
  src: string
  alt: string
  title: string
  width?: number
  height?: number
  contenttype?: string
}

export interface SubPod {
  title: string
  img?: PodImg
  plaintext: string
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}