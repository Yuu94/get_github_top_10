export abstract class Base<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string
  ) {
    this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;
    const impotedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = impotedNode.firstElementChild as U;

    this.attach();
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      "beforeend",
      this.element
    );
  }
}