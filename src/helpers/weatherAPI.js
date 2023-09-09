// Importando o Token para usar como chave da API
// const TOKEN = import.meta.env.VITE_TOKEN;
const TOKEN = 'c4838c19d4ac48f0b1a202458232505';

export const searchCities = async (nomeCid) => {
  try {
    // Verrifica se foi digitado o nome da cidade
    if (nomeCid.length === 0) {
      window.alert('Digite o nome da cidade');
    }

    const resposta = await fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${nomeCid}&aqi=no`);
    const dados = await resposta.json();
    // Verrifica se os dados foram encontrados
    if (dados.length === 0) {
      window.alert('Nenhuma cidade encontrada');
    }

    // Retorno os dados encontrados
    return dados;
    // E se acontecer algum erro,
  } catch (err) {
    // Passo o erro para o alert colocar na tela.
    window.alert(err.message);
  }
};

export const getWeatherByCity = async (urlCid) => {
  // Solicitando dados da API
  const resultado = await fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${urlCid}`);
  // Passando os dados para o formato json
  const dados = await resultado.json();
  // Descontruindo os dados em um formato mais simples
  const { current: { temp_c: tempC, condition: { text, icon } } } = dados;
  return {
    temp: tempC,
    condition: text,
    icon,
  };
};
