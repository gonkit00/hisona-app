import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

const ProgressBar = () => (
	<MaterialIndicator
		animationDuration={1000}
		color={'#2575FC'}
		size={32}
	/>
);

export default ProgressBar;
