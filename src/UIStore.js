import { observable, action } from "mobx";

const storeName = "UIStore";

class UIStore {
  constructor() {
    this.scrollX = 0;
    this.scrollY = 0;
    this.scrollingElement = document.scrollingElement;

    document.onscroll = function(e) {
      this.scrollY = this.scrollingElement.scrollTop;
      this.scrollX = this.scrollingElement.scrollLeft;
    }.bind(this);
  }

  scrollToView(classname, id) {
    let scrollAction = function() {
      let ele = document.querySelector(classname);
      if (!!classname && ele) {
        ele.scrollIntoView({
          behavior: "smooth"
        });
      } else if (!!id && ele) {
        document.querySelector(id).scrollIntoView({
          behavior: "smooth"
        });
      }
    };
    setTimeout(scrollAction);
  }
  scrollToCoordiname(x, y) {
    setTimeout(() => window.scroll(x, y));
  }
  // to specific x,y or to last tracked scrolled value in this object
  scroll(x, y) {
    x && y
      ? this.scrollTo(x, y)
      : !x && y
        ? this.scrollTo(0, y)
        : x && !y
          ? this.scrollTo(x, 0)
          : this.scrollTo(this.scrollX, this.scrollY);
  }
}
export default new UIStore();
