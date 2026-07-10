import {
  preparePdfData,
} from "./services/pdf-data.service.js";

import {
  generateUsersPdf,
} from "./services/pdf-generator.service.js";

export const exportUsers =
  async (queryParams) => {

    const exportData =
      await preparePdfData(
        queryParams
      );

    const pdfBuffer =
      await generateUsersPdf(
        exportData
      );

    return pdfBuffer;

  };