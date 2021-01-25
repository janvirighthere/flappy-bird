import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles';

export default function App() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight/2)
  const [obstaclesLeft, setObsctaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObsctaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [obsctaclesNegHeight, setObsctaclesNegHeight] = useState(0)
  const [obsctaclesNegHeightTwo, setObsctaclesNegHeightTwo] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo

  // Start bird falling
  useEffect(() => {
    if(birdBottom > 0 ) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
      return () => { clearInterval(gameTimerId) }
    }
    
  }, [birdBottom])

  //Start First obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      setTimeout(() => {
        obstaclesLeftTimerId = setObsctaclesLeft( obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      
      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      setObsctaclesLeft(screenWidth)
      setObsctaclesNegHeight( - Math.random() * 100)
    }
  }, [obstaclesLeft])

  //Start Second obstacles
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      setTimeout(() => {
        obstaclesLeftTimerIdTwo = setObsctaclesLeftTwo( obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
      
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      setObsctaclesLeftTwo(screenWidth)
      setObsctaclesNegHeightTwo( - Math.random() * 100)

    }
  }, [obstaclesLeftTwo])

  // Check for collisions

    useEffect(() => {
      if ((birdBottom < (obsctaclesNegHeight + obstacleHeight + 30 )) || 
      (birdBottom > (obstacleHeight + obstacleHeight + gap - 30) )&& 
      (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30)) {
        console.log('Game Over')
      }
      
      return () => {
        cleanup
      }
    }, [])

  return (
    <View style={styles.container}>
      <Bird 
        birdBottom={birdBottom}
        birdLeft={birdLeft}

      /> 
      <Obstacles
        color={'green'}
        obstacleHeight={obstacleHeight}
        obstacleWidth={obstacleWidth}
        randomBottom={obsctaclesNegHeight}
        gap={gap}
        obstaclesLeft={obstaclesLeft}
      />
      <Obstacles
        color={'yellow'}
        obstacleHeight={obstacleHeight}
        obstacleWidth={obstacleWidth}
        randomBottom={obsctaclesNegHeightTwo}
        gap={gap}
        obstaclesLeft={obstaclesLeftTwo}
      />
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
