// import {localStorageService} from '../services/localStorage.js';
const items = [
  {
    itemText: "questions 1",
    comments: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
        avatar: "./app/images/orange-avatar.png"
      },
      {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beata",
        avatar: "./app/images/blue-avatar.png"
      }
    ]
  },
  {
    itemText: "questions 2",
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

function MainController($log, localStorageService, $window) {
  const ctrl = this;
  ctrl.userAvatar = './app/images/user-avatar.png';

  // check initial state - if first load - save items to localStorage object
  // if not first start - get state from localStorage object
  if (localStorageService.getAppState() === null) {
    ctrl.items = localStorageService.setAppState(items);
  } else {
    ctrl.items = localStorageService.getAppState();
  }
  $log.log("ctrl.items ", ctrl.items);

  // save changes to localStorage before closing window
  $window.addEventListener('beforeunload', () => {
    localStorageService.setAppState(ctrl.items);
  });

  ctrl.checkedItem = {
    comments: []
  };
/*  if (angular.isUndefined(ctrl.checkedItem)) {

  }*/

  ctrl.getComments = () => {
    if (angular.isDefined(ctrl.checkedItem)) {
      return ctrl.checkedItem.comments;
    }
  };

  ctrl.checkItem = itemIndex => {
    // $log.log("ctrl.items ", ctrl.items);
    // $log.log("itemIndex ", itemIndex);
    ctrl.checkedItem = ctrl.items[itemIndex];
    // $log.log("ctrl.checkedItem ", ctrl.checkedItem);
    // localStorageService.setAppState(ctrl.items);
    // $log.log("batchLog.something");
  };

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

  ctrl.deleteItem = itemIndex => {
    ctrl.items.splice(itemIndex, 1);
  };

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

  ctrl.getSignClass = item => {
    if (item === ctrl.checkedItem) {
      return true;
    }
  };
}

export const main = {
  template: require('./main.html'),
  controller: ['$log', 'localStorageService', '$window', MainController],
  bindings: {}
};
