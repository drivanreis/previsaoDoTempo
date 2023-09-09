// Importando funções, que agora são variaves contendo dados que vamos precisar.
import { searchCities, getWeatherByCity } from './weatherAPI';

// Importando o Token para usar como chave da API
// const TOKEN = import.meta.env.VITE_TOKEN;
const TOKEN = 'c4838c19d4ac48f0b1a202458232505';

// Fatorando codigo: Criei uma função que cria elementos HTML.
// A função pede: a tag, a className e o Conteudo do elemento.
// E retorna o elemento prontinho pra ser adcionado.
function criaElementoHTML(tagName, className, textContent = '') {
  const element = document.createElement(tagName);
  element.classList.add(...className.split(' '));
  element.textContent = textContent;
  return element;
}

function createForecast(forecast) {
  const { date, maxTemp, minTemp, condition, icon } = forecast;

  const weekday = new Date(date);
  weekday.setDate(weekday.getDate() + 1);
  const weekdayName = weekday.toLocaleDateString('pt-BR', { weekday: 'short' });

  const previsaoElement = criaElementoHTML('div', 'forecast');
  const dateElement = criaElementoHTML('p', 'forecast-weekday', weekdayName);
  const tempContainer = criaElementoHTML('div', 'forecast-temp-container');
  const maxElement = criaElementoHTML('span', 'forecast-temp max', 'max');
  tempContainer.appendChild(maxElement);
  const maxTempElement = criaElementoHTML('span', 'forecast-temp max', `${maxTemp}º`);
  tempContainer.appendChild(maxTempElement);
  const minElement = criaElementoHTML('span', 'forecast-temp min', 'min');
  tempContainer.appendChild(minElement);
  const minTempElement = criaElementoHTML('span', 'forecast-temp min', `${minTemp}º`);
  tempContainer.appendChild(minTempElement);

  const conditionElement = criaElementoHTML('p', 'forecast-condition', condition);
  const iconElement = criaElementoHTML('img', 'forecast-icon');
  iconElement.src = icon.replace('64x64', '128x128');

  const midBox = criaElementoHTML('div', 'forecast-middle-container');
  midBox.appendChild(tempContainer);
  midBox.appendChild(iconElement);

  previsaoElement.appendChild(dateElement);
  previsaoElement.appendChild(midBox);
  previsaoElement.appendChild(conditionElement);

  return previsaoElement;
}

// Crei esta função para excluir todos os elementos filhos de um elemento.
// A função precisa do ID do elemento PAI e Exclui todos os elementos filhos.
function clearChildrenById(elementId) {
  // Na linha acima, pego o Id do Elemento.
  // Na linha abaixo, eu seto o Elemento
  const ElemtHtmlWillDie = document.getElementById(elementId);
  // e enquanto existir elementos filhos ele vai excluindo.
  while (ElemtHtmlWillDie.firstChild) {
    ElemtHtmlWillDie.removeChild(ElemtHtmlWillDie.firstChild);
  }
}

// Recebe uma lista de previsões
// e as exibe na tela dentro de um modal

export function showForecast(forecastList) {
  const previsaoBox = document.getElementById('forecast-container');
  const weekdayBox = document.getElementById('weekdays');
  clearChildrenById('weekdays');
  forecastList.forEach((forecast) => {
    const weekdayElement = createForecast(forecast);
    weekdayBox.appendChild(weekdayElement);
  });

  previsaoBox.classList.remove('hidden');
}

// Recebe um objeto com as informações de uma cidade
// e retorna um elemento HTML com varios elementos filhos

export function createCityElement(cityInfo) {
  const { name, country, temp, condition, icon, url } = cityInfo;
  const ul = document.getElementById('cities');
  const cidadeElement = criaElementoHTML('li', 'city');
  ul.appendChild(cidadeElement);

  const cabecaElement = criaElementoHTML('div', 'city-heading');
  const nameElement = criaElementoHTML('h2', 'city-name', name);
  cabecaElement.appendChild(nameElement);
  const countryElement = criaElementoHTML('p', 'city-country', country);
  cabecaElement.appendChild(countryElement);

  const tempElement = criaElementoHTML('p', 'city-temp', `${temp}º`);
  const tempBox = criaElementoHTML('div', 'city-temp-container');
  tempBox.appendChild(tempElement);
  const condicaoElement = criaElementoHTML('p', 'city-condition', condition);
  tempBox.appendChild(condicaoElement);

  const iconElement = criaElementoHTML('img', 'condition-icon');
  iconElement.src = icon.replace('64x64', '128x128');

  const infoBox = criaElementoHTML('div', 'city-info-container');
  infoBox.appendChild(tempBox);
  infoBox.appendChild(iconElement);

  const btnBotao = criaElementoHTML('button', 'classe-teste', 'Ver previsão');
  cidadeElement.appendChild(btnBotao);

  btnBotao.addEventListener('click', async () => {
    const result = await fetch(`http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${TOKEN}&q=${url}&days=7`);
    const data = await result.json();
    const data1 = data.forecast.forecastday;
    const data2 = data1.map((element) => ({
      date: element.date,
      maxTemp: element.day.maxtemp_c,
      minTemp: element.day.mintemp_c,
      condition: element.day.condition.text,
      icon: element.day.condition.icon,
    }));
    showForecast(data2);
  });

  cidadeElement.appendChild(cabecaElement);
  cidadeElement.appendChild(infoBox);
  cidadeElement.appendChild(iconElement);
  cidadeElement.appendChild(tempBox);

  return cidadeElement;
}

// Lida com o evento de submit do formulário de busca

export async function handleSearch(event) {
  // Anula o evento padrão.
  event.preventDefault();
  // limpa os elementos filhos
  clearChildrenById('cities');
  // captura o valor da busca
  const inputBusca = document.getElementById('search-input');
  const valorBusca = inputBusca.value;

  // usa o valor da busca para pegar os dados sobre a cidade
  const city = await searchCities(valorBusca);
  const url = city.map((element) => element.url);
  // crio a array de promesas
  const promise = url.reduce((anter, atual) => [...anter, getWeatherByCity(atual)], []);
  // solicito as promesas
  const something = await Promise.all(promise);
  // crio um novo arrey com dados
  const cityInfo = something.map((element, index) => ({
    name: city[index].name,
    country: city[index].country,
    temp: element.temp,
    condition: element.condition,
    icon: element.icon,
    url: city[index].url,
  }));
  // com o arrey de dados, vou criar os elementos
  cityInfo.forEach(createCityElement);
  return something;
}
