import { Suspense } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WithSuspense = <T,>(Comp: (props: any) => JSX.Element) => {
  function WrappedComp(props: T) {
    return <Suspense>{<Comp {...props} />}</Suspense>;
  }

  return Object.assign(WrappedComp, { displayName: Comp.name });
};

export default WithSuspense;
