export class Base {
  // templateElement;
  // hostElement;
  // element;

  constructor(
    templateId,
    hostElementId
  ) {
    this.templateElement = document.getElementById(templateId);
    this.hostElement = document.getElementById(hostElementId);
    const impotedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = impotedNode.firstElementChild;

    this.attach();
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      "beforeend",
      this.element
    );
  }
}