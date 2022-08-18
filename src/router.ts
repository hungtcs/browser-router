import { html, render } from 'lit';
import { BrowserRouter, RouteConfigs } from '../lib';

const routes: RouteConfigs = [
  {
    path: '',
    render: (outlet) => {
      render(
        html`
          <h3>这是 / </h3>
        `,
        outlet,
      );
    },
  },
  {
    path: 'hello',
    render: (outlet) => {
      render(
        html`
          <h3>这是 /hello </h3>
        `,
        outlet,
      );
    },
  },
  {
    path: 'hello/:name',
    render: (outlet, params) => {
      render(
        html`
          <h3>你好 ${ params.name }!</h3>
        `,
        outlet,
      );
    },
  },
  {
    path: '(.*)',
    render: (outlet) => {
      render(
        html`
          <h3>404</h3>
        `,
        outlet,
      );
    }
  }
];

export const router = new BrowserRouter({
  base: new URL(document.baseURI).pathname,
  routes,
  outlet: document.querySelector('#outlet')!,
});
