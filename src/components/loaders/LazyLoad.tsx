import { Suspense } from 'react';
import { Loading } from './Loading';

export const LazyLoad = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
