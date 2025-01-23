export const apiKey = import.meta.env.VITE_API_KEY;
export const apiUrl = import.meta.env.VITE_API_URL;

export const loginPath = "/auth/login";
export const registerPath = "/auth/register";
export const profilesPath = "/holidaze/profiles";
export const venuesPath = "/holidaze/venues";

export const locationsMap = {
  1: {
    city: "Corralejo",
    lat: 28.7296937,
    lng: -13.8671499,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23798.725749194145!2d-13.873206017975358!3d28.72729450980854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc4634e3ac34728f%3A0x77e9504a83d8947!2s35660%20Corralejo%2C%20Las%20Palmas%2C%20Spania!5e1!3m2!1sno!2sno!4v1737626558430!5m2!1sno!2sno",
  },
  2: {
    city: "Costa Calma",
    lat: 28.1585283,
    lng: -14.2294205,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23926.515590813495!2d-14.235066918166531!3d28.160867014807998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc479c432099f5d9%3A0xc5735e7c2a6a788d!2s35627%20Costa%20Calma%2C%20Las%20Palmas%2C%20Spania!5e1!3m2!1sno!2sno!4v1737627251710!5m2!1sno!2sno",
  },
  3: {
    city: "Caleta de Fuste",
    lat: 28.500821,
    lng: -13.8628367,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23873.38245204827!2d-13.878326518087036!3d28.397636862699763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc47c11e310805a3%3A0xa5fd9fa5724621d4!2s35610%20Caleta%20de%20Fuste%2C%20Las%20Palmas%2C%20Spania!5e1!3m2!1sno!2sno!4v1737627177959!5m2!1sno!2sno",
  },
  4: {
    city: "Morro Jable",
    lat: 28.0511096,
    lng: -14.351552,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23949.888622688137!2d-14.361813468201468!3d28.05613241574897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc477909030660b7%3A0x7de9142cf176d415!2sMorro%20Jable%2C%20Las%20Palmas%2C%20Spania!5e1!3m2!1sno!2sno!4v1737627330201!5m2!1sno!2sno",
  },
  5: {
    city: "El Cotillo",
    lat: 28.6855572,
    lng: -14.0108625,
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5952.0366754701!2d-14.012532422864291!3d28.685886175635638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc464caafc7aba09%3A0x102e330e9f75d580!2s35650%20El%20Cotillo%2C%20Las%20Palmas%2C%20Spania!5e1!3m2!1sno!2sno!4v1737627373160!5m2!1sno!2sno",
  },
};

export const fallBackMap =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d763938.2269933398!2d-14.789922060442619!3d28.399025647562258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc47a473afc20f81%3A0x2ac71c13b5b57f23!2sFuerteventura!5e1!3m2!1sno!2sno!4v1737627755427!5m2!1sno!2sno";
