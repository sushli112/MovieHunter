import {GenerateTemplateUtil} from './GenerateTemplateUtil';

export class GenerateStaticContent{
    constructor(){
        this.generateTemplateUtil = new GenerateTemplateUtil();
    }
    createModelTemplate(){
        const modalTemplate =` <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="popup-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Movie Detail</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card d-flex flex-row mainCard">
                            <img class="card-img-left" src="./src/img/jurassicPark.jpg" id="popupImg" alt="Card image cap">
                            <div class="card-body" id="info">
                                <div id="title">
                                    <h5 class="card-title" id="movieTttle"></h5>
                                    <h6 class="card-subtitle mb-2 text-muted" id="movieRelDate"></h6>
                                </div>
                                <p class="card-text" id="movieDesc">
                                </p>
                                <label data-error="wrong" data-success="right" for="inlineFormCustomSelect">Select Your List</label>
                                <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
                                    <option selected>Choose...</option>
                                    <option value="action">Action</option>
                                    <option value="adventure">Adventure</option>
                                    <option value="comic">Comic</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" id="add" class="btn btn-primary" data-dismiss="modal">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    const modelElement = this.generateTemplateUtil.createHTMLElement(modalTemplate);
    return modelElement;
    }
}