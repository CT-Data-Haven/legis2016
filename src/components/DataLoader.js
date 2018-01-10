import { csv } from 'd3-request';
import { queue } from 'd3-queue';
import { format } from 'd3-format';
import { nest } from 'd3-collection';
import * as _ from 'underscore';
import { uniqWith } from 'lodash';

const url1 = './data/legislative_data.csv';
const url2 = './data/legis_names.csv';
const url3 = './data/town_x_district.csv';

export const loadData = (callback = _.noop) => {
	queue()
		.defer(csv, url1)
		.defer(csv, url2)
		.defer(csv, url3)
		.await((error, datacsv, repcsv, towncsv) => {
			if (error) throw error;

			let data = cleanData(datacsv);
			let indics = makeIndicators(datacsv);
			let chambers = makeChambers(datacsv);
			let reps = _.indexBy(repcsv, 'id');
			let towns = makeTowns(towncsv);

			callback({
				initData: data,
				indics: indics,
				chambers: chambers,
				reps: reps,
				towns: towns
			});
		});
};

const cleanData = (data) => {
	return _.each(data, (d) => {
		d.value = +d.value;
		d.displayVal = format(d.format)(d.value);
	});
};

// const cleanData = (incoming) => {
// 	incoming.forEach((d) => {
// 		d.value = +d.value;
// 		d.displayVal = format(d.format)(d.value);
// 	});
//
// 	let data = _.chain(incoming)
// 		.each((d) => {
// 			d.value = +d.value;
// 			d.displayVal = format(d.format)(d.value);
// 		})
// 		.value();
//
// 	return nest()
// 		.key((d) => d.chamber)
// 		.key((d) => d.topic)
// 		.key((d) => d.indicator)
// 		.object(data);
// };



const makeIndicators = (data) => {
	let indics = _.chain(data)
		.filter((d) => d.type === 'map')
		.map((d) => {
			return _.pick(d, 'topic', 'indicator');
		})
		.value();
	// return uniqWith(indics, _.isEqual);
	let uniques = uniqWith(indics, _.isEqual);
	return nest()
		.key((d) => d.topic)
		.object(uniques);
};

const makeChambers = (data) => {
	let indics = _.chain(data)
		.filter((d) => d.type === 'map' && d.chamber !== 'State')
		.map((d) => {
			return _.pick(d, 'topic', 'chamber');
		})
		.value();
	// return uniqWith(indics, _.isEqual);
	let uniques = uniqWith(indics, _.isEqual);
	return nest()
		.key((d) => d.topic)
		.object(uniques);
};

const makeTowns = (data) => {
	return _.chain(data)
		.groupBy('id')
		.mapObject((d) => _.pluck(d, 'town').sort())
		// .pluck('town')
		.value();
};
