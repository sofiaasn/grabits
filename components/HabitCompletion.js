// components/HabitCompletion.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Colors } from './../constants/Colors';

const HabitCompletion = ({ habit, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(habit.id);
    alert(`Habit ${habit.title} completed!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{habit.title}</Text>
      <Text style={styles.description}>{habit.description}</Text>
      <Button
        title="Complete Habit"
        onPress={handleComplete}
        disabled={isCompleted}
      />
      {isCompleted && <Text style={styles.completedText}>Completed!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  completedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default HabitCompletion;
