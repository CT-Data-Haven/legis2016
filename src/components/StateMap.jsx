import React from 'react';
import { Map, TileLayer, GeoJSON, LayersControl, Pane } from 'react-leaflet';
import { Container } from 'semantic-ui-react';
import Legend from './Legend';

import '../styles/StateMap.css';

const { Overlay } = LayersControl;

// const position = [41.500765, -72.757507];
const bbox = [ [40.980707, -73.727775], [42.050587, -71.786994] ];



export default class StateMap extends React.Component {
	getStyle = (feature) => {
		let id = feature.properties.AFFGEOID;
		let color = this.props.data[id] ? this.props.colorscale(this.props.data[id].value) : '#ccc';

		return {
			fillColor: color,
			color: '#666',
			weight: 0.5,
			opacity: 1,
			fillOpacity: 0.8
		};
	};

	onEachFeature = (feature, layer) => {
		let id = feature.properties.AFFGEOID;

		layer.on('click', this.props.onClick)
			.on('mouseover', this.addHilite)
			.on('mouseout', this.removeHilite);
		layer.bindTooltip(() => {
			let data = this.props.data[id];
			return `District ${+id.substr(-3)}: ${data.displayVal}`;
		}, { direction: 'top', offset: [0, -20], className: 'custom-tip' });
	};

	addHilite = (e) => {
		e.target.setStyle({
			fillOpacity: 1,
			weight: 1
		}).bringToFront();
	};

	removeHilite = (e) => {
		e.target.setStyle({
			fillOpacity: 0.8,
			weight: 0.5
		});
	};

	render() {
		return (
			<div className="StateMap">
				<Container>

					{/* <Map center={position} zoom={8} scrollWheelZoom={false}> */}
					<Map bounds={bbox} scrollWheelZoom={false}>
						<Pane>
							<LayersControl position="topleft">
								<TileLayer
									url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png"
									// url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}"
									attribution="&copy; <a href=http://www.openstreetmap.org/copyright>OpenStreetMap</a> &copy; <a href=http://cartodb.com/attributions>CartoDB</a>"
									// ext="png"
								/>

								{/* senate */}
								<Overlay name="Senate" checked={this.props.chamber === 'Senate'}>
									<GeoJSON
										data={this.props.shapes.Senate}
										key={(feature) => feature.properties.AFFGEOID}
										onEachFeature={this.onEachFeature}
										style={this.getStyle}
									/>
								</Overlay>

								{/* house */}
								<Overlay name="House" checked={this.props.chamber === 'House'}>
									<GeoJSON
										data={this.props.shapes.House}
										key={(feature) => feature.properties.AFFGEOID}
										onEachFeature={this.onEachFeature}
										style={this.getStyle}
									/>
								</Overlay>
							</LayersControl>
						</Pane>
						<Pane>
							<TileLayer
								url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png"
								opacity={this.props.labeled ? 1 : 0}
							/>
						</Pane>

					</Map>
					<Legend colorscale={this.props.colorscale} />
				</Container>

			</div>
		)
	}
}
