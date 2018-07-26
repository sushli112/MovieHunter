export default class GenerateTemplateUtil {
  static createHTMLElement(html) {
    const template = document.createElement('template');

    template.innerHTML = html;

    return template.content.firstElementChild;
  }

  static createAllChildHTMLElement(html) {
    const template = document.createElement('template');

    template.innerHTML = html;

    return template.content;
  }
}
