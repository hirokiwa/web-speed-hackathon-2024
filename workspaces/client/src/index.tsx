// import './side-effects';

import $ from 'jquery';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { registerServiceWorker } from './utils/registerServiceWorker';
import { lazy } from 'react';
import React from 'react';

const main = async () => {
  await registerServiceWorker();
  // await preloadImages();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const ClientApp = lazy(() => import('@wsh-2024/app/src/index') as any);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const AdminApp = lazy(() => import('@wsh-2024/admin/src/index') as any);

  $(document).ready(() => {
    if (window.location.pathname.startsWith('/admin')) {
      ReactDOM.createRoot($('#root').get(0)!).render(<AdminApp />);
    } else {
      ReactDOM.hydrateRoot(
        $('#root').get(0)!,
        <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <React.Suspense fallback="loading...">
            <BrowserRouter>
              <ClientApp />
            </BrowserRouter>
          </React.Suspense>
        </SWRConfig>,
      );
    }
  });
};

main().catch(console.error);
