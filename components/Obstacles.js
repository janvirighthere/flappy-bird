import React from 'react'
import { View } from 'react-native';

const Obstacles = ({color, obstacleWidth, obstaclesLeft, gap, obstacleHeight, randomBottom}) => {
    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
            </View>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }}>
            </View>
           
        </>
    )
}

export default Obstacles
