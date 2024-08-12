export function buildUrl(baseUrl: string, page?: string, search?: string) {
  let url = baseUrl;

  const params: Record<string, string> = {};
  if (page) {
    params.page = page;
  }

  if (search) {
    params.search = search;
  }

  if (search) {
    params.search = search;
  }

  const queryString = new URLSearchParams(params).toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  return url;
}
