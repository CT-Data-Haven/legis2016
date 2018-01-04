import React from 'react';
import { Segment, Header, List } from 'semantic-ui-react';
import * as _ from 'underscore';

import '../styles/Profile.css';

// getting props update when checkbox fires---not sure why

export default class Profile extends React.Component {
	render() {
		let flat = _.chain(this.props.data)
			.values()
			.flatten()
			.filter((d) => d.id === this.props.id)
			.value();

		let name = flat[0] ? flat[0].district : '';
		let items = flat.map((d, i) => {
			return (
				<List.Item key={i} className={`list-${d.type}`}>
					{/* {icon} */}
					<List.Content><span className="list-indicator">{d.indicator}: </span>{d.displayVal}</List.Content>
				</List.Item>);
		});

		return (
			<div className="Profile">
				<Header as="h4" attached="top">{name} - {this.props.topic}
					<Header.Subheader>{this.props.rep.string}</Header.Subheader>
					<Header.Subheader><a href={this.props.rep.url} target="_blank">Sponsored bills, 2017</a></Header.Subheader>
				</Header>
				<Segment attached>
					<List relaxed>{items}</List>
				</Segment>
				<Segment attached secondary size="small">District contains all or parts of {this.props.towns.join(', ')}</Segment>
			</div>
		);
	}
}
