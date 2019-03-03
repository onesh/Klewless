let loaderHTML = '<div id="app_loading_spinner" class="loader"></div>';

class Loader {
  constructor () {
    this.loader = document.createElement('div');
    this.loader.innerHTML = loaderHTML;
    this.loader.classList.add('loader_spinner_parent')
    document.documentElement.appendChild(this.loader);
    // this.hideLoader();
  }

  showLoader () {
    this.loader.style.display = 'block';
  }

  hideLoader () {
    this.loader.style.display = 'none';
  }
}

export default new Loader();
