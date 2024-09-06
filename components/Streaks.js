import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Colors } from './../constants/Colors';

const Streaks = ({ streaks, habitsData }) => {
  const renderStreakItem = ({ item }) => {
    const streakCount = streaks[item.id] || 0;
    const progress = streakCount / 7; 

    return (
      <View style={styles.streakContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.streakText}>Current Streak: {streakCount} days</Text>
        <ProgressBar progress={progress} color={Colors.GREEN} style={styles.progressBar} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Streaks</Text>
      <FlatList
        data={habitsData}
        renderItem={renderStreakItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  streakContainer: {
    padding: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  streakText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
});

export default Streaks;
