'use strict';

import ApiUtils from './ApiUtils'

const BASE = 'https://eztextbook.herokuapp.com';

// criteria format: (ONE OF)
// {
//   type: [string Selling/Buying]
//   user: [bool]
//   bookid: [string]
//   wishlist: [bool]
// }

export function getPosts(criteria) {
  console.log('fetch utils');
  var type, path, bookid;
  type = path = bookid = '';

  if (criteria.type) {
    path = '/api/posts';
    type = criteria.type;
  }
  else if (criteria.user) {
    path = '/api/user/posts';
  }
  else if (criteria.bookid) {
    path = 'post/search/criteria';
    bookid = criteria.bookid;
  }
  else if (criteria.wishlist) {
    path = '/api/user/interests';
  }

  return ApiUtils.getToken('Login_Token').then((res) => {
    var token = res;
    console.log('fetching ',`${BASE}${path}?token=${token}&type=${type}&book=${bookid}`);
    return fetch(`${BASE}${path}?token=${token}&type=${type}&book=${bookid}`)
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
