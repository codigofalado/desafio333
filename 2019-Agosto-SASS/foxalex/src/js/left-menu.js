/**
 * Left Menu Handler
 *
 */

//{
// Class Left Menu
class LeftMenu {
  constructor() {
    // Main Wrapper
    this.mainWrap = document.querySelector('.left-menu-wrap');

    // Classes Prefix
    this.prefix = '.left-menu__';

    // Animation Settings
    this.timeAnimation = 300;
    this.classOpened = 'opened';
    this.isOpened = false;
    this.inAnimation = false;

    this.buttonInAnimation = false;
    this.buttonVisible = true;

    // Setting Buttons
    this.buttonsNames = ['toggle', 'cancel', 'toggle-show-button'];

    // Init Buttons Events
    this.buttons = [];
    this.initButtons();

    // Tabs
    this.currentTab = 'info';
    this.initTabsEvents();
    this.updateTabs();

    // Callbacks
    this.onToggleMenuIcon = () => {};
  }

  // Show/Hidden Menu Events
  // Show
  show() {
    if (!this.isOpened || !this.inAnimation) {
      this.inAnimation = true;
      this.mainWrap.classList.add(this.classOpened);
      this.buttons.toggle.classList.add(this.classOpened);
      setTimeout(() => {
        this.inAnimation = false;
        this.isOpened = true;
      }, this.timeAnimation);
    }
  }
  hide() {
    if (this.isOpened || !this.inAnimation) {
      this.inAnimation = true;
      this.mainWrap.classList.remove(this.classOpened);
      this.buttons.toggle.classList.remove(this.classOpened);
      setTimeout(() => {
        this.inAnimation = false;
        this.isOpened = false;
      }, this.timeAnimation);
    }
  }

  // Update Tabs Status
  initTabsEvents() {
    document.querySelectorAll(this.prefix + 'tabs a').forEach(link => {
      link.onclick = e => {
        e.preventDefault();
        this.currentTab = e.target.getAttribute('data-key');
        this.updateTabs();
      };
    });
  }

  updateTabs() {
    const tabsLinks = document.querySelectorAll(this.prefix + 'tabs a');
    const tabsContent = document.querySelectorAll(this.prefix + 'tab');
    tabsLinks.forEach(link => {
      if (link.getAttribute('data-key') === this.currentTab) {
        link.classList.add('selected');
      } else {
        link.classList.remove('selected');
      }
    });
    tabsContent.forEach(tab => {
      if (tab.getAttribute('data-key') === this.currentTab) {
        tab.classList.add('visible');
      } else {
        tab.classList.remove('visible');
      }
    });
  }

  // Init Buttons Events
  initButtons() {
    this.buttonsNames.forEach(name => {
      const el = document.querySelector(this.prefix + name);
      if (el) {
        const nameHandle =
          name.replace(/\-(\w)/g, (m, w) => w.toUpperCase()) + 'HandleClick';
        if (this[nameHandle]) {
          el.addEventListener('click', e => this[nameHandle](e));
        }
        this.buttons[name] = el;
      }
    });
  }

  /**
   *  Handling with Buttons Events
   */

  // Button Confirm Handle
  toggleHandleClick(e) {
    if (this.opened) {
      this.hide();
    } else {
      this.show();
    }
  }

  // Button Cancel Handle
  cancelHandleClick(e) {
    console.log('Cancel');
    this.hide();
  }

  toggleShowButtonHandleClick(e) {
    if (this.buttonInAnimation || this.isOpened || this.inAnimation) {
      return false;
    }
    this.buttonInAnimation = true;
    this.buttonVisible = !this.buttonVisible;
    // Callback
    this.onToggleMenuIcon(this.buttonVisible);
    // Update Elements
    document
      .querySelector('.left-menu-toggle-button')
      .classList.toggle('not-visible');
    setTimeout(() => {
      this.buttonInAnimation = false;
    }, 500);
  }
}
// End Left Menu Class
