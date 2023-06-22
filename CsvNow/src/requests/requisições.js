import axios from "axios";

const apiUrls = new Map([
  ["apiFileCsv", import.meta.env.VITE_PORT_API_FILES_CSV],
]);

function tipoUrl(tipo) {
  if (!apiUrls.has(tipo)) {
    return null;
  }
  return apiUrls.get(tipo);
}

export async function postData(url, data, acaoSucesso, acaoFalha, tipoApi) {
  let tipoApiEscolhida = tipoUrl(tipoApi);

  return await axios
    .post(`${tipoApiEscolhida}${url}`, data)
    .then((response) => acaoSucesso(response.data))
    .catch((falha) => {
      acaoFalha(falha);
    });
}

export async function getData(url, acaoSucesso, acaoFalha, tipoApi) {
  let tipoApiEscolhida = tipoUrl(tipoApi);

  return await axios
    .get(`${tipoApiEscolhida}${url}`)
    .then((response) =>acaoSucesso(response.data))
    .catch((falha) => {
      acaoFalha(falha);
    });
}
