import GenerateTemplateUtil from '../Common/GenerateTemplateUtil';

export default class FooterView {
  constructor() {
    this.generateTemplateUtil = new GenerateTemplateUtil();
  }

  createFooterComponent() {
    const footerTemplate = ` <div class="container">
        <div class="row">
            <div class="col-md-3">
                <ul class="footerList">
                    <li>
                        <h4>THE BASICS</h4>
                    </li>
                    <li>About TMDb</li>
                    <li>Support Forums</li>
                    <li>API</li>
                    <li>Blog</li>
                </ul>
            </div>
            <div class="col-md-3">
                <ul class="footerList">
                    <li>
                        <h4>GET INVOLVED</h4>
                    </li>
                    <li>* Contribution Bible</li>
                    <li>3rd Party Application</li>
                    <li>Add New Movie</li>
                </ul>
            </div>
            <div class="col-md-3">
                <ul class="footerList">
                    <li>
                        <h4>COMMUNITY</h4>
                    </li>
                    <li>Guidlines</li>
                    <li>Leaderboard</li>
                    <li>Forums</li>
                    <li>Twitter</li>
                    <li>Facebook</li>
                </ul>
            </div>
            <div class="col-md-3">
                <ul class="footerList">
                    <li>
                        <h4>LEGAL</h4>
                    </li>
                    <li>Terms Of Use</li>
                    <li>Privacy Policy</li>
                    <li>Forums</li>
                    <li>Twitter</li>
                    <li>Facebook</li>
                </ul>
            </div>
        </div>
    </div>`;

    const footer = this.generateTemplateUtil.createHTMLElement(footerTemplate);
    document.getElementById('footer').appendChild(footer);
  }
}
