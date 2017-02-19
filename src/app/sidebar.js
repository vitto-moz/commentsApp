function SidebarController($log, $transitions, $location) {
  const ctrl = this;
  // section initialization - this info would be received from backend
  ctrl.sections = [{name: 'Overview', link: 'comments'}];

  // check inital state - if one of link is selected
  for (let i = ctrl.sections.length - 1; i >= 0; i--) {
    if (ctrl.sections[i].link === ($location.url()).replace("/", "")) {
      ctrl.activeSetionIndex = i;
    }
  }

  // method for highlighting selected section - check if highlight is required
  ctrl.getActiveSection = sectionIndex => {
    if (ctrl.activeSetionIndex === sectionIndex) {
      return true;
    }
  };

  // get index of selected/clicked section
  ctrl.activateSection = sectionIndex => {
    ctrl.activeSetionIndex = sectionIndex;
  };

  // clear section highlight if 'Main' section is activated
  $transitions.onSuccess({}, () => {
    if ($location.url() === "/") {
      ctrl.activeSetionIndex = -1;
    }
  });
}

export const sidebar = {
  template: require('./sidebar.html'),
  controller: ['$log', '$transitions', '$location', SidebarController],
  bindings: {}
};
