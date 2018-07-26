export default class GenerateTemplateUtil {
  createHTMLElement(html) {
    const template = document.createElement('template');

    template.innerHTML = html;

    return template.content.firstElementChild;
  }

  createAllChildHTMLElement(html) {
    const template = document.createElement('template');

    template.innerHTML = html;

    return template.content;
  }
}
