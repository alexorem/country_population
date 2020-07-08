import React, { Component } from 'react';
import css from './countries.module.css';

export default class Country extends Component {
  render() {
    // as informações chegarão via props
    const { country } = this.props;
    const { name, flag } = country;
    return (
      <div className={`${css.country} ${css.border}`}>
        <img className={css.flag} src={flag} alt={name} />
        <span className={css.countryName}>{name}</span>
      </div>
    );
  }
}
