import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const HistoryItem = ({ item, index }) => {
  return (
    <Text style={[styles.historyItem, {color: item.status > 1 ? 'red' : 'green',}]}>
      {item.subject}
    </Text>
  );
}

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {!!focusHistory.length &&
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex:1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearHistory}>
              <RoundedButton title="Clear" size={75} onPress={() => onClear()}/>
            </View>
          </>
        }
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    fontSize: fontSizes.md,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    alignText: 'center'
  },
  clearHistory: {
    alignItems: 'center',
    padding: paddingSizes.md
  },
});
