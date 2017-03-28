'use strict';

import ApiUtils from './ApiUtils'

const BASE = 'https://eztextbook.herokuapp.com';

// criteria format:
// {
//   type:
//   userid:
//   bookid:
//   wishlist:
// }

export function getPosts(criteria) {
  console.log('fetch utils');
  var type, path, userid, bookid;
  type = path = userid = bookid = '';

  if (criteria.type) {
    path = '/api/posts';
    type = criteria.type;
  }
  else if (criteria.userid) {
    path = '/api/user/posts';
    userid = criteria.userid;
  }
  else if (criteria.bookid) {
    path = '/api/user/interests';
  }
  else if (criteria.wishlist) {
    path = '/api/user/interests';
  }

  return ApiUtils.getToken('Login_Token').then((res) => {
    var token = res;
    return fetch(`${BASE}${path}?token=${token}&type=${type}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
