export function getPeopleQuery(pageQuery?: string, searchQuery?: string) {
  let query = '';

  if (!!pageQuery || !!searchQuery) {
    let pageQueryString = '';
    let searchQueryString = '';

    if (pageQuery) {
      pageQueryString += `page=${pageQuery}`;
    }

    if (searchQuery) {
      searchQueryString = `search=${searchQuery.trim()}`;
    }

    query += [pageQueryString, searchQueryString].filter(Boolean).join('&');
  }

  return query;
}
