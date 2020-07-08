import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  // montar o estado da aplicação
  constructor() {
    super();
    // this.state recebe o vetor de todos os paises vazio
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '',
    };
  }

  // ciclo de vida componentDidMount é um excelente local
  // para colocar requisição HTTP
  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    // extrai (desestrutura) o nome, numericCode, Flag, population do json
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population,
      };
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(allCountries);

    this.setState({
      // atribui a variavel allContries ao vetor allCountries
      allCountries: allCountries,
      filteredCountries: allCountries,
      filteredPopulation: filteredPopulation,
    });
  }

  calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
    return totalPopulation;
  };

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    const filterLoawerCase = newText.toLowerCase();

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(filterLoawerCase);
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(
      filteredCountries
    );

    this.setState({
      filteredCountries: filteredCountries,
      filteredPopulation: filteredPopulation,
    });
  };

  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;
    //console.log(allCountries);
    return (
      <div className="container">
        <h1 style={styles.centeredTitle}> React Countries</h1>

        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          totalPopulation={filteredPopulation}
          onChangeFilter={this.handleChangeFilter}
        />

        {/*envia o vetor allContries atraves da props countries 
        para o componente Countries.js*/}
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
