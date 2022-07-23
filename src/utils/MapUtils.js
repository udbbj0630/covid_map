export const MapUtil = {
  /**
   * {zoomLevel: stats}
   * 1 - 6: country stats
   * 7 - 9: state stats
   * 10 - 20: county stats
   * total: total confrimed #
   */
  covertCovidPoints: function (rawCountyPoints) {
    if (!rawCountyPoints) {
      return {};
    }
    const states = this.getStateData(rawCountyPoints);
    // TODO - implement country aggregation function

    const result = {};
    let i = 1;
    for (; i <= 6; i++) {
      // TODO assign country values
    }
    for (; i <= 9; i++) {
      result[i] = states;
    }
    for (; i <= 20; i++) {
      result[i] = rawCountyPoints;
    }
    return result;
  },
  getStateData: function (rawCountyPoints) {
    // {country: {state: {
    //     confirmed,
    //     death,
    //     coordinates,
    // }}}
    const states = {
      type: "state",
    };

    for (const point of rawCountyPoints) {
      // {} -> {"us": {}} - we do want
      // {"us": {"CA": {...}}} -> {"us": {}}  - we don't want
      // Create states[point.country][point.province] if absent, or leave as it is.
      states[point.country] = states[point.country] || {};
      states[point.country][point.province] = states[point.country][
        point.province
      ] || {
        confirmed: 0,
        death: 0,
      };

      states[point.country][point.province].confirmed += point.stats.confirmed;
      states[point.country][point.province].death += point.stats.deaths;
      states[point.country][point.province].coordinates = point.coordinates;
    }
    return states;
  },
  inBoundary: function (bounds, coordinates) {
    return (
      coordinates &&
      bounds &&
      bounds.nw &&
      bounds.se &&
      ((coordinates.longitude >= bounds.nw.lng &&
        coordinates.longitude <= bounds.se.lng) ||
        (coordinates.longitude <= bounds.nw.lng &&
          coordinates.longitude >= bounds.se.lng)) &&
      ((coordinates.latitude >= bounds.se.lat &&
        coordinates.latitude <= bounds.nw.lat) ||
        (coordinates.latitude <= bounds.se.lat &&
          coordinates.latitude >= bounds.nw.lat))
    );
  },
};
