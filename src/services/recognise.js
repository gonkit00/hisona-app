/** Recognise Service
 *
 * Sends photos to be classified
 *
 */

import config from '~/config/api';

const BASE_ENDPOINT = config.prod_base_endpoint;

const RecogniseService = {
  async classifyImage(uri) {
    const url = `${BASE_ENDPOINT}/classification/watson/classify`;

    try {
      const data = new FormData();

      data.append('photo', {
        uri,
        name: 'artefact',
        type: 'image/jpg',
      });

      // Create the config object for the POST
      const opts = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data;',
        },
        body: data,
      };

      const response = await fetch(url, opts);

      if (!response.ok) {
        throw new Error(`Failed to get a response from the '${url}' endpoint`);
      }

      // Response was ok
      const classData = await response.json();

      return classData;
    } catch (error) {
      console.error(error);
    }
  },

  async mapClassToArtefact(classData) {
    const url = `${BASE_ENDPOINT}/classification/image/map`;

    try {
      const opts = {
        method: 'POST',
        body: JSON.stringify(classData),
      };

      const response = await fetch(url, opts);

      if (!response.ok) {
        throw new Error(`Failed to get a response from the '${url}' endpoint`);
      }

      // Response was ok
      const artefact = await response.json();
      return artefact;
    } catch (error) {
      console.error(error);
    }
  },
};

export default RecogniseService;
