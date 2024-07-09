// screens/Home.jsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';
import HabitCompletion from './../../components/HabitCompletion';
import Streaks from './../../components/Streaks';

const habitsData = [
  { id: '1', title: 'Recycle paper waste', description: 'Dispose of used paper products in recycling bins to reduce landfill waste.' },
  { id: '2', title: 'Use reusable bags', description: 'Opt for reusable bags instead of plastic bags when shopping to minimize plastic waste.' },
  { id: '3', title: 'Turn off lights when not needed', description: 'Switch off lights in empty rooms to conserve energy and reduce electricity bills.' },
];

const badgesCriteria = [
  { name: 'Beginner Eco Warrior', count: 1, icon: 'leaf' },
  { name: 'Intermediate Eco Warrior', count: 5, icon: 'globe' },
  { name: 'Advanced Eco Warrior', count: 10, icon: 'trophy' },
];

const Home = () => {
  const [option, setOption] = useState('Today');
  const [completedHabits, setCompletedHabits] = useState({});
  const [streaks, setStreaks] = useState({});
  const [earnedBadges, setEarnedBadges] = useState({});
  const [lastCompletionDates, setLastCompletionDates] = useState({});

  const completeHabit = (habitId) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    const updatedCompletedHabits = { ...completedHabits };
    updatedCompletedHabits[habitId] = (updatedCompletedHabits[habitId] || 0) + 1;

    if (!lastCompletionDates[habitId] || lastCompletionDates[habitId] !== today) {
      const updatedStreaks = { ...streaks };
      updatedStreaks[habitId] = (updatedStreaks[habitId] || 0) + 1;
      setStreaks(updatedStreaks);
    }

    setCompletedHabits(updatedCompletedHabits);
    setLastCompletionDates({ ...lastCompletionDates, [habitId]: today });

    checkBadgeEarning(updatedCompletedHabits);
  };

  const checkBadgeEarning = (updatedCompletedHabits) => {
    const newEarnedBadges = badgesCriteria.filter(badge => 
      Object.values(updatedCompletedHabits).some(count => count >= badge.count)
    );

    setEarnedBadges(newEarnedBadges);
  };

  const renderHabitItem = ({ item }) => (
    <HabitCompletion habit={item} onComplete={completeHabit} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { marginTop: 50 }]}>Welcome to Grabits!</Text>
        <Text style={{ color: 'gray', fontWeight: 'bold', marginTop: 10 }}>
          Click on the habit to complete it
        </Text>
      </View>
      <View style={styles.tabContainer}>
        {['Today', 'Streaks', 'Badges'].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setOption(tab)}
            style={[styles.tab, option === tab && styles.activeTab]}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </Pressable>
        ))}
      </View>
      {option === 'Today' && (
        <FlatList
          data={habitsData}
          renderItem={renderHabitItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {option === 'Streaks' && (
        <Streaks streaks={streaks} habitsData={habitsData} />
      )}
      {option === 'Badges' && (
        <View style={styles.badgesContainer}>
          <Text style={styles.badgesHeader}>Your Earned Badges</Text>
          {earnedBadges && earnedBadges.length > 0 ? (
            <View style={styles.badges}>
              {earnedBadges.map((badge, index) => (
                <View key={index} style={styles.badge}>
                  <Entypo name={badge.icon} size={24} color="black" style={styles.badgeIcon} />
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No badges earned yet!</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  activeTab: {
    backgroundColor: '#a3e4a7',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgesContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badgesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badge: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  badgeIcon: {
    marginBottom: 5,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Home;
