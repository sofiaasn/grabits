import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Alert } from 'react-native';
import { Colors } from './../../constants/Colors';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons'; // Importing icons from Expo

const habitsData = {
  Today: [
    { id: '1', title: 'Recycle paper waste', category: 'green' },
    { id: '2', title: 'Use reusable bags', category: 'green' },
    { id: '3', title: 'Turn off lights when not needed', category: 'yellow' },
    { id: '4', title: 'Take a short shower', category: 'yellow' },
    { id: '5', title: 'Compost food waste', category: 'blue' },
    { id: '6', title: 'Use a reusable water bottle', category: 'blue' },
    { id: '7', title: 'Bike or walk instead of driving', category: 'purple' },
    { id: '8', title: 'Support a local farmer’s market', category: 'purple' },
    { id: '9', title: 'Plant a tree', category: 'orange' },
    { id: '10', title: 'Use energy-efficient appliances', category: 'orange' }
  ],
  Weekly: [
    { id: '11', title: 'Recycle plastic waste', category: 'green' },
    { id: '12', title: 'Use public transportation', category: 'green' },
    { id: '13', title: 'Reduce water usage', category: 'yellow' },
    { id: '14', title: 'Eat vegetarian meals', category: 'yellow' },
    { id: '15', title: 'Unplug devices not in use', category: 'blue' },
    { id: '16', title: 'Use eco-friendly products', category: 'blue' },
    { id: '17', title: 'Avoid single-use plastics', category: 'purple' },
    { id: '18', title: 'Donate clothes', category: 'purple' },
    { id: '19', title: 'Conserve energy at home', category: 'orange' },
    { id: '20', title: 'Participate in a cleanup event', category: 'orange' }
  ]
};

const Home = () => {
  const [option, setOption] = useState('Today');
  const [completedHabits, setCompletedHabits] = useState({});
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    // Simulate fetching earned badges from API or local storage
    // For demonstration, initialize with some badges
    setEarnedBadges([
      { name: 'Beginner Eco-Warrior Badge', icon: 'leaf' },
      { name: 'Environmental Steward Badge', icon: 'globe' },
      { name: 'Green Champion Badge', icon: 'tree' }
    ]);
  }, []);

  const handleCompleteHabit = (id) => {
    setCompletedHabits(prevState => {
      const newCount = (prevState[id] || 0) + 1;
      return { ...prevState, [id]: newCount };
    });

    checkBadgeConditions(id);

    Alert.alert('Congratulations!', 'You have completed the habit!', [{ text: 'OK' }]);
  };

  const promptCompleteHabit = (id) => {
    Alert.alert(
      'Complete Habit',
      'Are you sure you want to mark this habit as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => handleCompleteHabit(id) }
      ]
    );
  };

  const renderHabitItem = ({ item }) => (
    <Pressable
      style={[styles.habit, { backgroundColor: getCategoryColor(item.category) }]}
      onPress={() => promptCompleteHabit(item.id)}
    >
      <Text style={styles.habitText}>{item.title}</Text>
    </Pressable>
  );

  const renderOverallItem = ({ item }) => (
    <View style={[styles.habit, { backgroundColor: getCategoryColor(item.category) }]}>
      <Text style={styles.habitText}>
        {item.title} - Completed {completedHabits[item.id] || 0} times
      </Text>
    </View>
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case 'green':
        return '#C8E6C9'; 
      case 'yellow':
        return '#FFF9C4'; 
      case 'blue':
        return '#BBDEFB'; 
      case 'purple':
        return '#E1BEE7'; 
      case 'orange':
        return '#FFE0B2';
      default:
        return '#E0E0E0';
    }
  };

  const checkBadgeConditions = (id) => {
    let badges = [];

    if ((completedHabits[id] || 0) >= 5) {
      badges.push({ name: 'Beginner Eco-Warrior Badge', icon: 'leaf' });
    }
    if ((completedHabits[id] || 0) >= 10) {
      badges.push({ name: 'Environmental Steward Badge', icon: 'globe' });
    }
    if ((completedHabits[id] || 0) >= 20) {
      badges.push({ name: 'Green Champion Badge', icon: 'tree' });
    }
    if ((completedHabits[id] || 0) >= 50) {
      badges.push({ name: 'Eco-Master Badge', icon: 'sun' });
    }
    if ((completedHabits[id] || 0) >= 100) {
      badges.push({ name: 'Conservation Expert Badge', icon: 'water' });
    }

    setEarnedBadges(badges);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome to Grabits!</Text>
        <Text style={{ color: 'gray', fontWeight: 'bold', marginTop: 10 }}>
          Click on the habit to complete it
        </Text>
      </View>
      <View style={styles.tabContainer}>
        {['Today', 'Weekly', 'Overall', 'Badges'].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setOption(tab)}
            style={[styles.tab, option === tab && styles.activeTab]}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </Pressable>
        ))}
      </View>
      {option === 'Badges' && (
        <View style={styles.badgesContainer}>
          <Text style={styles.badgesHeader}>Your Earned Badges</Text>
          {earnedBadges && earnedBadges.length > 0 ? (
            <View style={styles.badges}>
              {earnedBadges.map((badge, index) => (
                <View key={index} style={styles.badge}>
                  <Ionicons name={badge.icon} size={24} color="black" style={styles.badgeIcon} />
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No badges earned yet!</Text>
          )}
        </View>
      )}
      <FlatList
        data={option === 'Overall' ? Object.keys(completedHabits).map(id => ({
          id,
          title: Object.values(habitsData.Today).concat(habitsData.Weekly).find(habit => habit.id === id)?.title || '',
          category: Object.values(habitsData.Today).concat(habitsData.Weekly).find(habit => habit.id === id)?.category || ''
        })) : habitsData[option]}
        renderItem={option === 'Overall' ? renderOverallItem : renderHabitItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
    backgroundColor: Colors.WHITE,
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#E0FFFF',
  },
  tabText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
  },
  habit: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  habitText: {
    fontSize: 16,
    color: 'black',
  },
  badgesContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  badgesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  badgeIcon: {
    marginRight: 5,
  },
  badgeName: {
    fontSize: 16,
  },
});

export default Home;
