import React, { Component } from "react";
import NumberFormat from "react-number-format";
import Currency from "./Currency";

class Currencies extends Component {
  state = {
    inputField: 0,
    exRates: 0,
    isOpenedUSD: true,
    isOpenedGBP: true,
    isOpenedEUR: true,
  };

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData.bind(this), 60000);
  }

  async loadData() {
    try {
      const res = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const exRates = await res.json();
      this.setState({ exRates: exRates.bpi });
    } catch (err) {
      console.log(err);
    }
  }

  BTCChangeHandler = (event) => {
    this.setState({ inputField: event.target.value });
  };

  removeComponentHandler = (name) => {
    this.setState({ [name]: false });
  };

  render() {
    const exRates = this.state.exRates;
    const ratesData = Object.values(exRates)
      .map((value) => value.rate)
      .map((s) => parseFloat(s.split(",").join("")));

    const formatedRates = {
      usd: (
        <NumberFormat
          value={this.state.inputField * ratesData[0]}
          thousandSeparator={true}
          decimalScale={2}
          prefix={"$"}
        />
      ),
      gbp: (
        <NumberFormat
          value={this.state.inputField * ratesData[1]}
          thousandSeparator={true}
          decimalScale={2}
          prefix={"£"}
        />
      ),
      eur: (
        <NumberFormat
          value={this.state.inputField * ratesData[2]}
          thousandSeparator={true}
          decimalScale={2}
          prefix={"€"}
        />
      ),
    };

    return (
      <div>
        <div className="Item">
          <input
            className="Item-input"
            type="number"
            placeholder="enter BTC value"
            onChange={this.BTCChangeHandler}
          />
        </div>

        <div className="Currencies">
          {this.state.isOpenedUSD ? (
            <Currency
              name="USD"
              value={formatedRates.usd}
              click={() => this.removeComponentHandler("isOpenedUSD")}
            />
          ) : null}
          {this.state.isOpenedGBP ? (
            <Currency
              name="GPB"
              value={formatedRates.gbp}
              click={() => this.removeComponentHandler("isOpenedGBP")}
            />
          ) : null}
          {this.state.isOpenedEUR ? (
            <Currency
              name="EUR"
              value={formatedRates.eur}
              click={() => this.removeComponentHandler("isOpenedEUR")}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default Currencies;
