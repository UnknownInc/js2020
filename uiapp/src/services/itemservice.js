import apicall from './api';

export default class ItemService {

  static async get(id) {
    const error = {code: 500, message: 'API error.'};
    try {
      const response = await apicall(`/api/item/${id||'current'}`);
      if (response.ok) {
        return await response.json();
      }

      if (response.status===404) return null;

      error.code=response.status;
      error.message=response.statusText;

    } catch (e) {
      console.error(e);
    }
    throw error;
  }

  static async getComments(offset, limit) {
    const error = {code: 500, message: 'API error.'};
    try {
      const response = await apicall(`/api/item/comments?offset=${offset}&limit=${limit}`);
      if (response.ok) {
        return await response.json();
      }

      if (response.status===404) return null;

      error.code=response.status;
      error.message=response.statusText;

    } catch (e) {
      console.error(e);
    }
    throw error;
  }

  static async addComment(values) {
    const error = {code: 500, message: 'API error.'};
    try {
      const response = await apicall(`/api/item/comments`,{
        method: 'POST',
        body: JSON.stringify(values)
      });
      if (response.ok) {
        return await response.json();
      }

      if (response.status===404) return null;

      error.code=response.status;
      error.message=response.statusText;

    } catch (e) {
      console.error(e);
    }
    throw error;
  }

  static async update(id, values) {
    const error = {code: 500, message: 'API error.'};
    try {
      const response = await apicall(`/api/item/${id||'current'}`,{
        method: 'POST',
        body: JSON.stringify(values)
      });
      if (response.ok) {
        return await response.json();
      }

      if (response.status===404) return null;

      error.code=response.status;
      error.message=response.statusText;

    } catch (e) {
      console.error(e);
    }
    throw error;
  }
}