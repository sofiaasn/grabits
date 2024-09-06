import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, Share } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';
import HabitCompletion from './../../components/HabitCompletion';
import Streaks from './../../components/Streaks';

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

const badgesCriteria = [
  { name: 'Beginner Eco Warrior', count: 1, icon: 'leaf' },
  { name: 'Intermediate Eco Warrior', count: 5, icon: 'globe' },
  { name: 'Advanced Eco Warrior', count: 10, icon: 'trophy' },
];

const Home = () => {
  const [option, setOption] = useState('Today');
  const [completedHabits, setCompletedHabits] = useState({});
  const [streaks, setStreaks] = useState({});
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [lastCompletionDates, setLastCompletionDates] = useState({});

  const completeHabit = (habitId) => {
    const today = new Date().toISOString().split('T')[0];
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

  const getTodayHabits = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const startIndex = (dayOfYear % habitsData.length) - 3;

    return habitsData.slice(startIndex, startIndex + 3).concat(habitsData.slice(0, Math.max(0, startIndex + 3 - habitsData.length)));
  };

  const renderHabitItem = ({ item }) => (
    <HabitCompletion habit={item} onComplete={completeHabit} />
  );

  const shareBadge = async (badge) => {
    try {
      await Share.share({
        message: `I just earned the ${badge.name} badge by completing sustainable habits in the Grabits app! 🌱`,
      });
    } catch (error) {
      alert('Error sharing badge:', error.message);
    }
  };

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
          data={getTodayHabits()}
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
          {earnedBadges.length > 0 ? (
            <View style={styles.badges}>
              {earnedBadges.map((badge, index) => (
                <View key={index} style={styles.badge}>
                  <Entypo name={badge.icon} size={24} color="black" style={styles.badgeIcon} />
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Pressable style={styles.shareButton} onPress={() => shareBadge(badge)}>
                    <Entypo name="share" size={24} color="white" />
                  </Pressable>
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
  shareButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#213145',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
