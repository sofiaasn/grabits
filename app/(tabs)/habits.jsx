import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Colors } from './../../constants/Colors';

const Habits = () => {
  const habitsData = [
    { id: '1', title: 'Recycle paper waste', description: 'Dispose of used paper products in recycling bins to reduce landfill waste.' },
    { id: '2', title: 'Use reusable bags', description: 'Opt for reusable bags instead of plastic bags when shopping to minimize plastic waste.' },
    { id: '3', title: 'Turn off lights when not needed', description: 'Switch off lights in empty rooms to conserve energy and reduce electricity bills.' },
    { id: '4', title: 'Take a short shower', description: 'Limit shower time to conserve water, a precious resource essential for life.' },
    { id: '5', title: 'Compost food waste', description: 'Convert organic kitchen scraps into compost to enrich soil and reduce methane emissions.' },
    { id: '6', title: 'Use a reusable water bottle', description: 'Use a durable water bottle instead of disposable plastic bottles to reduce plastic waste.' },
    { id: '7', title: 'Bike or walk instead of driving', description: 'Opt for biking or walking for short trips to reduce carbon emissions and stay active.' },
    { id: '8', title: 'Support a local farmer’s market', description: 'Buy fresh produce from local farmers to support the local economy and reduce food miles.' },
    { id: '9', title: 'Plant a tree', description: 'Contribute to the environment by planting trees that provide oxygen, shade, and habitat for wildlife.' },
    { id: '10', title: 'Use energy-efficient appliances', description: 'Upgrade to energy-efficient appliances to save energy and reduce utility bills.' },
    { id: '11', title: 'Recycle plastic waste', description: 'Dispose of used plastic products in recycling bins to reduce plastic pollution.' },
    { id: '12', title: 'Use public transportation', description: 'Opt for buses, trains, or subways to reduce traffic congestion and air pollution.' },
    { id: '13', title: 'Reduce water usage', description: 'Conserve water by fixing leaks, using water-saving fixtures, and adopting mindful water habits.' },
    { id: '14', title: 'Eat vegetarian meals', description: 'Reduce your carbon footprint by choosing plant-based meals that require fewer resources to produce.' },
    { id: '15', title: 'Unplug devices not in use', description: 'Save energy and reduce standby power consumption by unplugging electronics when not in use.' },
    { id: '16', title: 'Use eco-friendly products', description: 'Choose products made from sustainable materials that are biodegradable or recyclable.' },
    { id: '17', title: 'Avoid single-use plastics', description: 'Minimize plastic waste by refusing single-use plastics such as straws, utensils, and bags.' },
    { id: '18', title: 'Donate clothes', description: 'Support charitable organizations by donating gently used clothes to reduce textile waste.' },
    { id: '19', title: 'Conserve energy at home', description: 'Reduce energy consumption by adjusting thermostat settings, using LED bulbs, and improving insulation.' },
    { id: '20', title: 'Participate in a cleanup event', description: 'Join community cleanup initiatives to remove litter, plastics, and debris from public spaces.' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Don't know what each habit means? Here's a description:</Text>
      {habitsData.map((habit) => (
        <View key={habit.id} style={styles.habitContainer}>
          <View style={styles.habitHeader}>
            <Text style={styles.habitTitle}>{habit.title}</Text>
          </View>
          <Text style={styles.habitDescription}>{habit.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  habitContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  habitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.DARK_GRAY,
  },
  habitDescription: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Habits;
