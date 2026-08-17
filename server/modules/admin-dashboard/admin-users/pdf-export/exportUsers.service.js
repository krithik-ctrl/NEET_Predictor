import {
  preparePdfData,
} from "./services/pdf-data.service.js";

import {
  generateUsersPdf,
} from "./services/pdf-generator.service.js";

export const exportUsers = async (queryParams, downloaderId) => {
  const exportData = await preparePdfData(queryParams, downloaderId);
  const pdfBuffer = await generateUsersPdf(exportData);
  return pdfBuffer;
};