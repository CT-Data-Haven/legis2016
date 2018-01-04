import React from 'react';
import { Container, Form } from 'semantic-ui-react';
import * as _ from 'underscore';

import Check from './Check';

import '../styles/Filters.css';

export default class Filters extends React.Component {
    render() {
		// console.log(this.props.indics[this.props.topic]);
		let topics = _.chain(this.props.indics)
			.keys()
			.map((d) => ({ key: d, value: d, text: d }))
			.value();
		let indicators = this.props.indics[this.props.topic].map((d) => ({
			key: d.indicator, value: d.indicator, text: d.indicator
		}));

        return (
            <div className="Filters">

				<Container>
					<Form>
						<Form.Group>
							<Form.Field>
								<label htmlFor="chamber">Select chamber</label>
							</Form.Field>
							<Form.Radio
								name="chamber"
								value="Senate"
								label="Senate (upper chamber)"
								checked={this.props.chamber === 'Senate'}
								onChange={this.props.onChange}
							/>
							<Form.Radio
								name="chamber"
								value="House"
								label="House (lower chamber)"
								checked={this.props.chamber === 'House'}
								onChange={this.props.onChange}
							/>
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
								className="div5000"
							/>
						</Form.Group>

						<Form.Field>
							{/* <Button
								color={this.props.labeled ? 'teal' : 'grey'}
								onClick={this.props.onToggle}
								size="tiny"
								icon
								basic
								>
								<Icon name={this.props.labeled ? 'check circle' : 'circle outline'} /> Map labels
							</Button> */}
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
