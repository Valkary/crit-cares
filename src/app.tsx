// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/solid-query';

const queryClient = new QueryClient();


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router root={props => <Suspense>{props.children}</Suspense>}>
        <FileRoutes />
      </Router>
    </QueryClientProvider>
  );
}
