import $ from 'jquery';

 class CloneHelper {
  constructor () {
  }

  clone (obj) {
    return $.extend(true, {}, obj);
  }
}

export default new CloneHelper();
