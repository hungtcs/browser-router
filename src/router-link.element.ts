import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { router } from './router';

@customElement('router-link')
export class RouterLink extends LitElement {

  @property({ reflect: true })
  public href!: string;

  protected render() {
    return html`
      <a href="${ this.href }" @click=${ this.onClick } style="all: inherit;"><slot></slot></a>
    `;
  }

  private onClick(event: PointerEvent) {
    event.preventDefault();
    router.navigate(this.href);
  }

}
