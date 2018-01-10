import React from 'react';
// import { Grid, Row, Col } from 'react-bootstrap';
import { Container, Grid, Header } from 'semantic-ui-react';
import * as _ from 'underscore';
import { ckmeans } from 'simple-statistics';
import { scaleThreshold } from 'd3-scale';
import { nest } from 'd3-collection';
import { RedOr } from 'cartocolor';
import './App.css';

import StateMap from './components/StateMap';
import Filters from './components/Filters';
import Profile from './components/Profile';
import Intro from './components/Intro';
import Footer from './components/Footer';

const lowerShp = require('./components/shapes/lower.json');
const upperShp = require('./components/shapes/upper.json');
const shapes = { House: lowerShp, Senate: upperShp };

const baseId = { Senate: '610U500US09001', House: '620L500US09001' };
const reset = { chamber: 'Senate', topic: 'Community vitality', indicator: 'Local parks in good condition' };

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			toMap: [],
			topicData: [],
			chamber: reset.chamber,
			topic: reset.topic,
			indicator: reset.indicator,
			colorscale: scaleThreshold().domain([0, 1]).range(['#ccc']),
			id: baseId.Senate,
			overTowns: props.towns[baseId.Senate],
			labeled: true,
			compare: false
		};
	}

	componentDidMount() {
		let { chamber, topic, indicator } = this.state;
		let opts = { chamber, topic, indicator };
		this.update({ ...opts });
	}

	fetchData({ chamber, topic }) {
		// return _.mapObject(this.props.initData[chamber][topic], (arr, key) => arr.concat(this.props.initData['State'][topic][key]));
		let chamberData = _.where(this.props.initData, { chamber: chamber, topic: topic });
		let stateData = _.where(this.props.initData, { chamber: 'State', topic: topic });
		return chamberData.concat(stateData);
	}

	update(opts) {
		let indicator = opts.indicator;
		let fetch = this.fetchData(opts);
		let topicData = nest().key((d) => d.indicator).object(fetch);
		let data = topicData[indicator];
		let toMap = _.indexBy(data, 'id');


		this.setState({
			data,
			indicator,
			toMap,
			topicData,
			colorscale: this.makeScale(toMap)
		});
	}

	handleChange = (e, { name, value }) => {
		console.log(name, value);
		// set id to baseline if changing chamber
		if (name === 'chamber') {
			this.setState({
				id: baseId[value]
			});
		}

		// let indicator = name === 'topic' ? this.props.indics[value][0].indicator : this.state.indicator;
		let indicator = name === 'topic' ? this.props.indics[value][0].indicator : this.state.indicator;
		let { chamber, topic } = this.state;
		let opts = { chamber, topic, indicator };

		this.update({ ...opts, [name]: value });

		this.setState({
			[name]: value,
		});
	};

	handleShape = (e) => {
		let id = e.target.feature.properties.AFFGEOID;
		let overTowns = this.props.towns[id];
		this.setState({
			id,
			overTowns
			// profileData
		});
	};

	handleToggle = (e, { name, value }) => {
		this.setState({
			// labeled: !this.state.labeled
			[name]: !this.state[name]
		});
	};

	makeScale(data) {
		let vals = _.pluck(data, 'value').sort((a, b) => a - b);
		if (!vals.length) {
			return scaleThreshold().domain([0, 1]).range(['#ccc']);
		} else {
			let brks = ckmeans(vals, 5).map((d) => d[0]).slice(1);
			return scaleThreshold()
				.domain(brks)
				.range(RedOr[5]);
		}
	}

	render() {
    	return (
    		<div className="App">
				<Container>
					<Header as="h1">2016 Connecticut State Legislative District Profiles</Header>
					<Grid stackable>
						<Grid.Row>
							<Grid.Column>
								<Intro />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={10}>
								<Filters
									chamber={this.state.chamber}
									topic={this.state.topic}
									indicator={this.state.indicator}
									labeled={this.state.labeled}
									indics={this.props.indics}
									chambers={this.props.chambers}
									onChange={this.handleChange}
									onToggle={this.handleToggle}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={10}>
								<Header as="h4" block attached="top">{this.state.indicator}</Header>
								<StateMap
									data={this.state.toMap}
									shapes={shapes}
									chamber={this.state.chamber}
									colorscale={this.state.colorscale}
									onClick={this.handleShape}
									towns={this.state.overTowns}
									labeled={this.state.labeled}
									indicator={this.state.indicator}
								/>
							</Grid.Column>
							<Grid.Column width={6}>
								<Profile
									data={this.state.topicData}
									id={this.state.id}
									topic={this.state.topic}
									rep={this.props.reps[this.state.id]}
									towns={this.state.overTowns}
									compare={this.state.compare}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Footer />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
    	);
	}
}

export default App;
