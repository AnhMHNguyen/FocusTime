import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { colors } from '../../utils/colors';
import { paddingSizes } from '../../utils/sizes';


export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if(Platform.OS === 'ios'){
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  }
  
  const onEnd = () => {
    vibrate();
    setMinutes(0);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes} 
          isPaused={!isStarted} 
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xxl}}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <ProgressBar 
        progress={progress} 
        color="#EEC4C4" 
        style={{ height: 10, marginTop: paddingSizes.sm }}
      />
      <View style={styles.buttonWrapper}>
        <Timing changeTime={changeTime}/>
      </View>
      <View style={styles.buttonWrapper}>
        { isStarted ? 
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
          :
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        }
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center'
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  countdown: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: .3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: paddingSizes.lg,
    paddingLeft: paddingSizes.lg,
  }
});
