import React from 'react';
import { Checkbox } from 'semantic-ui-react';

const Check = (props) => {
	const { onChange, id, ...rest } = props;
	return (
		<Checkbox {...rest} onChange={(e, data) => onChange(e, { ...data, id })} />
	);
};

export default Check;
