import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, BarChart, CustomAxisTick, Bar, CustomBarLabel, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

import unshelteredArray from './unshelteredObj.json';

import styled from 'styled-components';

class QueryComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      individuals: [],
      ethnicity: [],
      mentalhealth: [],
      sleeping: [],
      geolocation: [],
      unsheltered15: [],
      unsheltered13: [],
      unsheltered11: [],
      emergencyShelter15: [],
      emergencyShelter13: [],
      emergencyShelter11: [],
      transitionalHousing15: [],
      transitionalHousing13: [],
      transitionalHousing11: [],
    }
    this.getEthnicity = this.getEthnicity.bind(this)
    this.getMentalHealth = this.getMentalHealth.bind(this)
    this.getSleeping = this.getSleeping.bind(this)
    this.getGeolocation = this.getGeolocation.bind(this)
    this.getIndividuals = this.getIndividuals.bind(this)
  }

  componentDidMount() {
    this.getEthnicity();
    this.getMentalHealth();
    this.getSleeping();
    this.getGeolocation();
    this.getIndividuals();
  }

  getIndividuals() {
    return fetch('http://service.civicpdx.org/homeless/individuals/')
      .then(results => results.json())
      .then(results => this.setState({geolocation: results}))
      .catch(errors => console.log("failr"));
  }

  getGeolocation() {
    return fetch('http://service.civicpdx.org/homeless/geolocation/')
      .then(results => results.json())
      .then(results => this.setState({geolocation: results}))
      .catch(errors => console.log("failr"));
  }

  getEthnicity() {
    return fetch('http://service.civicpdx.org/homeless/ethnicity/')
      .then(
        results =>
          results.json()
      ) .then(
        results => {
          // console.log("results: "+JSON.stringify(results))
          this.setState({
            ethnicity: results,
            unsheltered15: filterHomeless(results, "15", "unsheltered"),
            unsheltered13: filterHomeless(results, "13", "unsheltered"),
            unsheltered11: filterHomeless(results, "11", "unsheltered"),
            emergencyShelter15: filterHomeless(results, "15", "emergencyShelter"),
            emergencyShelter13: filterHomeless(results, "13", "emergencyShelter"),
            emergencyShelter11: filterHomeless(results, "11", "emergencyShelter"),
            transitionalHousing15: filterHomeless(results, "15", "transitionalHousing"),
            transitionalHousing13: filterHomeless(results, "13", "transitionalHousing"),
            transitionalHousing11: filterHomeless(results, "11", "transitionalHousing"),
          });
        }
      )
      .catch(
        errors => console.log("failr")
      );
  }

  getMentalHealth() {
    return fetch('http://service.civicpdx.org/homeless/disability/')
      .then(results => results.json())
      .then(results => this.setState({mentalhealth: results}))
      .catch(errors => console.log("failr"));
  }

  getSleeping() {
    return fetch('http://service.civicpdx.org/homeless/sleeping/')
      .then(results => results.json())
      .then(results => this.setState({sleeping: results}))
      .catch(errors => console.log("failr"));
  }

  render() {
    return (
      <div>
        <h1>All Homelessness</h1>
        <PieChart>
          <Pie data={this.state.unsheltered15} cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        </PieChart>
        <LineChart width={1000} height={400} data={this.state.ethnicity}>
          <XAxis dataKey="year" />
          <YAxis dataKey="count"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ethnicity" stroke="#adf" />
          <Line type="monotone" dataKey="sheltertype" stroke="#fda" />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
        <div className="unshelteredCharts">
          <h2>All Unsheltered</h2>
          <div className="charts">
            <h3>2015</h3>
            <RadarChart outerRadius={90} width={400} height={280} data={this.state.unsheltered15}>
              <Radar name="count" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <PolarGrid />
              <Legend />
              <PolarAngleAxis dataKey="ethnicity" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
            </RadarChart>
          </div>
          <div className="charts">
            <h3>2013</h3>
            <RadarChart outerRadius={90} width={400} height={280} data={this.state.unsheltered13}>
              <Radar name="count" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <PolarGrid />
              <Legend />
              <PolarAngleAxis dataKey="ethnicity" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
            </RadarChart>
          </div>
          <div className="charts">
            <h3>2011</h3>
            <RadarChart outerRadius={90} width={400} height={280} data={this.state.unsheltered11}>
              <Radar name="count" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <PolarGrid />
              <Legend />
              <PolarAngleAxis dataKey="ethnicity" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
            </RadarChart>
          </div>
        </div>
        <div className="homeless-ethnicity">
          <h2>Unsheltered Homeless by Ethnicity</h2>
          <div className="charts">
            <h3>2015</h3>
            <BarChart width={300} height={200} data={this.state.unsheltered15}>
              <XAxis dataKey="ethnicity" />
              <YAxis dataKey="count"/>
              <Tooltip />
              <Legend/>
              <Bar type="monotone" dataKey="count" barSize={30} fill="#fda"/>
            </BarChart>
          </div>
          <div className="charts">
            <h3>2013</h3>
            <BarChart width={300} height={200} data={this.state.unsheltered13}>
              <XAxis dataKey="ethnicity" />
              <YAxis dataKey="count"/>
              <Tooltip />
              <Legend/>
              <Bar type="monotone" dataKey="count" barSize={30} fill="#fda"/>
            </BarChart>
          </div>
          <div className="charts">
            <h3>2011</h3>
            <BarChart width={300} height={200} data={this.state.unsheltered11}>
              <XAxis dataKey="ethnicity" />
              <YAxis dataKey="count"/>
              <Tooltip />
              <Legend/>
              <Bar type="monotone" dataKey="count" barSize={30} fill="#fda"/>
            </BarChart>
          </div>
        </div>
        <div className="homeless-ethnicity">
          <h2>Emergency Shelter Homeless by Ethnicity</h2>
          <div className="charts">
            <h3>2015</h3>
            <BarChart width={300} height={200} data={this.state.emergencyShelter15}>
              <XAxis dataKey="ethnicity" />
              <YAxis dataKey="count"/>
              <Tooltip />
              <Legend/>
              <Bar type="monotone" dataKey="count" barSize={30} fill="#fda"/>
            </BarChart>
          </div>
          <div className="charts">
            <h3>2013</h3>
            <BarChart width={300} height={200} data={this.state.emergencyShelter13}>
              <XAxis dataKey="ethnicity" />
              <YAxis dataKey="count"/>
              <Tooltip />
              <Legend/>
              <Bar type="monotone" dataKey="count" barSize={30} fill="#fda"/>
            </BarChart>
          </div>
          <div className="charts">
            <h3>2011</h3>
            <BarChart width={300} height={200} data={this.state.emergencyShelter11}>
              <XAxis dataKey="ethnicity" />
              <YAxis dataKey="count"/>
              <Tooltip />
              <Legend/>
              <Bar type="monotone" dataKey="count" barSize={30} fill="#fda"/>
            </BarChart>
          </div>
        </div>
        <div className="homeless-ethnicity">
          <h2>Transitional Housing Homeless by Ethnicity</h2>
          <div className="charts">
            <h3>2015</h3>
            <BarChart width={300} height={200} data={this.state.transitionalHousing15}>
              <XAxis dataKey="ethnicity" />
              <YAxis dataKey="count"/>
              <Tooltip />
              <Legend/>
              <Bar type="monotone" dataKey="count" barSize={30} fill="#fda"/>
            </BarChart>
          </div>
          <div className="charts">
            <h3>2013</h3>
            <BarChart width={300} height={200} data={this.state.transitionalHousing13}>
              <XAxis dataKey="ethnicity" />
              <YAxis dataKey="count"/>
              <Tooltip />
              <Legend/>
              <Bar type="monotone" dataKey="count" barSize={30} fill="#fda"/>
            </BarChart>
          </div>
          <div className="charts">
            <h3>2011</h3>
            <BarChart width={300} height={200} data={this.state.transitionalHousing11}>
              <XAxis dataKey="ethnicity" />
              <YAxis dataKey="count"/>
              <Tooltip />
              <Legend/>
              <Bar type="monotone" dataKey="count" barSize={30} fill="#fda"/>
            </BarChart>
          </div>
        </div>
        <div>
          <h2>Mental Health</h2>
          <LineChart width={1000} height={400} data={this.state.mentalhealth}>
            <XAxis dataKey="year" />
            <YAxis dataKey="count"/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="disabilitytype" stroke="#adf" />
            <Line type="monotone" dataKey="sheltertype" stroke="#fda" />
            <Line type="monotone" dataKey="count" stroke="#adf" />
          </LineChart>
        </div>
        <h2>Sleeping</h2>
        <LineChart width={1000} height={400} data={this.state.sleeping}>
          <XAxis dataKey="year" />
          <YAxis dataKey="count"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#adf" />
          <Line type="monotone" dataKey="sleepinglocation" stroke="#fda" />
        </LineChart>
        <div>
          <h2>Geolocation</h2>
          <LineChart width={1000} height={400} data={this.state.geolocation}>
            <XAxis dataKey="year" />
            <YAxis dataKey="count"/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#adf" />
            <Line type="monotone" dataKey="geographiclocation" stroke="#fda" />
          </LineChart>
        </div>
      </div>
    )
  }
}

function HomelessEthnicity(props) {
  const HomelessObj = props.allEthnicity.map((obj) =>
    <HomelessPerson person={obj}/>
  );
  return (
    <ul>{HomelessObj}</ul>
  );
}

function filterHomeless(results, inputYear, shelterType) {
  var array = [];
  results.forEach(function(item) {
    var year = item.year.toString().substr(-2);
    if(year === inputYear) {
        if(item.sheltertype === shelterType) {
          array.push(item);
        }
    }
  });
  return array;
}

function LineChartExport(props) {
    return(
      <LineChart width={1000} height={400} data={props.array}>
        <XAxis dataKey="15" />
        <YAxis dataKey="count"/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ethnicity" stroke="#adf" />
        <Line type="monotone" dataKey="sheltertype" stroke="#fda" />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    )
}

function HomelessPerson(props) {
  return (
    <li key={props.person.ethnicity}>
      {props.person.ethnicity}
      <p>{props.person.sheltertype}</p>
      <p>{props.person.year}</p>
    </li>
  );
}

export default QueryComponent;