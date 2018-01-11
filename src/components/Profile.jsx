import React from 'react';
import { Segment, Header, Table } from 'semantic-ui-react';
import * as _ from 'underscore';

import '../styles/Profile.css';

// getting props update when checkbox fires---not sure why

export default class Profile extends React.Component {
	render() {

		let flat = _.chain(this.props.data)
			.values()
			.flatten()
			.filter((d) => {
				if (this.props.compare) {
					return (d.id === this.props.id) || (d.chamber === 'State' && d.type === 'map');
				} else {
					return (d.id === this.props.id);
				}
			})
			.value();
		let base = flat[0];
		let name = base ? `State ${base.chamber} District ${+base.id.substr(-3)}` : '';
		// let name = flat[0] ? flat[0].district : '';
		let items = flat.map((d, i) => {
			let ct = d.chamber === 'State' ? 'CT: ' : '';
			let indicator = d.indicator;
			// let indicator = d.chamber === 'State' ? `CT: ${this.props.meta[ind].displayIndicator}` : d.indicator;
			let level = d.chamber === 'State' ? 'ct' : 'district';
			return (
				<Table.Row key={i}>
					<Table.Cell className={`list-${d.type} list-${level}`}>{ct}{this.props.meta[indicator].displayIndicator}</Table.Cell>
					<Table.Cell textAlign="right">{d.displayVal}</Table.Cell>
				</Table.Row>
			);

		});
		return (
			<div className="Profile">
				<Header as="h4" attached="top">{name} - {this.props.meta[this.props.indicator].displayTopic}
					<Header.Subheader>{this.props.rep.string}</Header.Subheader>
					<Header.Subheader><a href={this.props.rep.url} target="_blank">Sponsored bills, 2017</a></Header.Subheader>
				</Header>
				<Table definition attached compact unstackable>
					<Table.Body>{items}</Table.Body>
				</Table>
				<Segment attached secondary size="small">District contains all or parts of {this.props.towns.join(', ')}</Segment>
			</div>
		);
	}
}
