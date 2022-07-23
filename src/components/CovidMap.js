import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { CovidCasesService } from "../services/CovidCasesService";
import CaseCard from "./CaseCard";
import { MapUtil } from "../utils/MapUtils";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class CovidMap extends Component {
  static defaultProps = {
    center: {
      lat: 42,
      lng: -74,
    },
    zoom: 6,
  };
  state = {
    points: {},
    zoomLevel: 6,
    boundry: {},
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCqAup0UaMAEI1AdNb0ZSjOG8EUb5Tb1vU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={this.getCovidPoints.bind(this)}
          onChange={({ zoom, bounds }) => {
            this.setState({
              zoomLevel: zoom,
              boundry: bounds,
            });
          }}
        >
          <CaseCard lat={42} lng={-74} text="My Marker" />
          {this.renderCovidPoints()}
        </GoogleMapReact>
      </div>
    );
  }

  getCovidPoints() {
    //Call getAllCountyCases
    //SetState
    CovidCasesService.getAllCountyCases()
      .then((response) => {
        this.setState({
          points: MapUtil.covertCovidPoints(response.data),
        });
      })
      .catch((error) => console.error(error));
  }

  renderCovidPoints() {
    const pointsToRender = this.state.points[this.state.zoomLevel];
    const result = [];
    if (!pointsToRender) {
      return result;
    }
    // render county
    if (pointsToRender.constructor === Array) {
      for (const point of pointsToRender) {
        if (!MapUtil.inBoundary(this.state.boundry, point.coordinates)) {
          continue;
        }
        result.push(
          <CaseCard
            lat={point.coordinates.latitude}
            lng={point.coordinates.longitude}
            title={point.province}
            subTitle={point.county}
            confirmed={point.stats.confirmed}
            death={point.stats.deaths}
          />
        );
      }
    }
    // render state
    if (pointsToRender.type === "state") {
      for (const country in pointsToRender) {
        if (pointsToRender[country] === "state") {
          continue;
        }
        for (const state in pointsToRender[country]) {
          const point = pointsToRender[country][state];
          if (!MapUtil.inBoundary(this.state.boundry, point.coordinates)) {
            continue;
          }
          result.push(
            <CaseCard
              lat={point.coordinates.latitude}
              lng={point.coordinates.longitude}
              title={country}
              subTitle={state}
              confirmed={point.confirmed}
              death={point.death}
            />
          );
        }
      }
    }
    //TODO - render country
    return result;
  }
}

export default CovidMap;
