import {
  preparePdfData,
} from "./services/pdf-data.service.js";

import {
  generateUsersPdf,
} from "./services/pdf-generator.service.js";
import { generateUsersExcel } from "./services/excel-generator.service.js";

export const exportUsers = async (queryParams, downloaderId) => {
  const exportData = await preparePdfData(queryParams, downloaderId);
  const pdfBuffer = await generateUsersPdf(exportData);
  return pdfBuffer;
};

export const exportUsersExcel = async (queryParams, downloaderId) => {
  const exportData = await preparePdfData(queryParams, downloaderId);
  return await generateUsersExcel(exportData);
};