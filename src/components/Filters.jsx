import React from 'react';
import { Container, Form } from 'semantic-ui-react';
import * as _ from 'underscore';

import Check from './Check';

import '../styles/Filters.css';

export default class Filters extends React.Component {
    render() {
		let indicsOpts = _.chain(this.props.chambers)
			.values()
			.map((d) => _.where(d, { chamber: this.props.chamber }))
			.flatten()
			.pluck('topic')
			.value();

		// invert? or find way to get displayTopic from topic
		// let topics = indicsOpts.map((d) => ({ key: d, value: d, text: d }));
		let info = _.values(this.props.meta);
		let topics = indicsOpts.map((d) => {
			return { key: d, value: d, text: _.where(info, { topic: d })[0].displayTopic };
		});

		let indicators = !_.isEmpty(this.props.indics) ? this.props.indics[this.props.topic].map((d) => ({
			key: d.indicator, value: d.indicator, text: this.props.meta[d.indicator].displayIndicator
		})) : [];

		let radios = !_.isEmpty(this.props.chambers) ? this.props.chambers[this.props.topic].map((d) => (
			<Form.Radio
				key={d.chamber}
				name="chamber"
				value={d.chamber}
				label={d.chamber}
				onChange={this.props.onChange}
				checked={this.props.chamber === d.chamber}
			/>
		)) : [];
        return (
            <div className="Filters">

				<Container>
					<Form>
						<Form.Group>
							<Form.Field>
								<label htmlFor="chamber">Select chamber</label>
							</Form.Field>
							{radios}

						</Form.Group>

						<Form.Group widths="equal">
							<Form.Select
								name="topic"
								id="topic-select"
								label="Topic"
								value={this.props.topic}
								options={topics}
								onChange={this.props.onChange}
								className="div5000"
							/>
							<Form.Select
								name="indicator"
								id="indicator-select"
								label="Indicator"
								value={this.props.indicator}
								options={indicators}
								onChange={this.props.onChange}
								className="div4000"
							/>
						</Form.Group>

						<Form.Field>
							<Check name="labeled" onChange={this.props.onToggle} label="Show map labels" defaultChecked />
						</Form.Field>

						<Form.Field>
							<Check name="compare" onChange={this.props.onToggle} label="Show statewide values" />
						</Form.Field>

					</Form>
				</Container>
            </div>
        );
    }
}
