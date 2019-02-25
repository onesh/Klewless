
class Modal {

  constructor () {
    // this.hideModal();
    this.modal = document.createElement('div');
    document.documentElement.appendChild(this.modal);
    this.modal.style.display = 'none';

  }

  getPartial (message) {
    return '<p>' + message + '</p>'
  }

  showModal (message) {

    this.modal.innerHTML = this.getPartial(message);
    this.modal.classList.add('modal-footer');
    this.modal.style.display = 'block';
  }

  hideModal () {
    this.modal.style.display = 'none';
  }
}

export default new Modal();
