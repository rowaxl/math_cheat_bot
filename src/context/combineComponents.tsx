import { ComponentProps, FC, PropsWithChildren } from 'react'



export default (...components: FC<PropsWithChildren>[]):FC<PropsWithChildren> => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC<PropsWithChildren>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  )
}