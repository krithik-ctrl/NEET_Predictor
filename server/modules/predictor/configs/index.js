import aiq from "./aiq.js";
import andhraPradesh from "./andhraPradesh.js";
import karnataka from "./karnataka.js";
import kerala from "./kerala.js";
import maharashtra from "./maharashtra.js";
import tamilNadu from "./tamilNadu.js";
// import telangana from "./telangana.js"; // Add later
import AndamanNicobar from "./andaman&nicobar.js";
import assamConfig from "./assam.js";
const stateConfigs = {
  AIQ: aiq,
  Karnataka: karnataka,
  "Tamil Nadu": tamilNadu,
  "Andhra Pradesh": andhraPradesh,
  Kerala: kerala,
  Maharashtra: maharashtra,
  // Telangana: telangana,
 AndamanNicobar:AndamanNicobar,
 Assam:assamConfig
};

export default stateConfigs;