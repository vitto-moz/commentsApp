// Item & Comments initialization - this info would be received from backend;
const items = [
  {
    itemText: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni",
    comments: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
        avatar: "./app/images/orange-avatar.png"
      },
      {
        text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga",
        avatar: "./app/images/blue-avatar.png"
      }
    ]
  },
  {
    itemText: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    comments: [
      {
        text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
        avatar: "./app/images/blue-avatar.png"
      },
      {
        text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio",
        avatar: "./app/images/orange-avatar.png"
      }
    ]
  }
];

function MainController($log, localStorageService, $window, $transitions) {
  const ctrl = this;
  // initialization of user avatar - this info would be received from backend
  ctrl.userAvatar = './app/images/user-avatar.png';
  ctrl.Initialize = () => {
    ctrl.InputItemText = ctrl.InputCommentText = '';
  };

  // check initial state - if first load - save items to localStorage object
  // if not first start - get state from localStorage object
  if (localStorageService.getAppState() === null) {
    ctrl.items = localStorageService.setAppState(items);
  } else {
    ctrl.items = localStorageService.getAppState();
  }

  // save changes to localStorage before closing window
  $window.addEventListener('beforeunload', () => {
    localStorageService.setAppState(ctrl.items);
  });

  // save changes to localStorage router state changing
  $transitions.onExit({}, () => {
    localStorageService.setAppState(ctrl.items);
  });

  // fix "undefined" issue if "checkedItem" property
  ctrl.checkedItem = {
    comments: []
  };

  // get comments of checked item
  ctrl.getComments = () => {
    if (angular.isDefined(ctrl.checkedItem)) {
      return ctrl.checkedItem.comments;
    }
  };

  // method for checking item by means of click
  ctrl.checkItem = itemIndex => {
    ctrl.checkedItem = ctrl.items[itemIndex];
    ctrl.checkedItemNumber = itemIndex + 1;
  };

  // method for item adding
  ctrl.addItem = () => {
    if (ctrl.InputItemText === '') {
      return;
    }
    const newItem = {};
    newItem.itemText = ctrl.InputItemText;
    newItem.comments = [];
    ctrl.items.push(newItem);
    ctrl.InputItemText = "";
  };

  // method for item deleting
  ctrl.deleteItem = itemIndex => {
    ctrl.items.splice(itemIndex, 1);
  };

  // method for comment adding
  ctrl.addComment = () => {
    if (ctrl.InputCommentText === '') {
      return;
    }
    const newComment = {
      text: ctrl.InputCommentText,
      avatar: ctrl.userAvatar
    };
    ctrl.checkedItem.comments.push(newComment);
    ctrl.InputCommentText = "";
  };

  // method for highlighting selected item
  ctrl.getSignClass = item => {
    if (item === ctrl.checkedItem) {
      return true;
    }
  };
}

export const main = {
  template: require('./main.html'),
  controller: ['$log', 'localStorageService', '$window', '$transitions', MainController],
  bindings: {}
};
