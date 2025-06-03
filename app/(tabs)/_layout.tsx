import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Clock, Heart, UserCog, Plus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

export default function TabLayout() {
  const tabBarBackground = () => {
    if (Platform.OS === 'ios') {
      return (
        <BlurView
          tint="light"
          intensity={75}
          style={StyleSheet.absoluteFill}
        />
      );
    }
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: Colors.background },
        ]}
      />
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.secondary,
        tabBarStyle: styles.tabBar,
        tabBarBackground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Routine',
          tabBarIcon: ({ color, size }) => (
            <Clock size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="emotions"
        options={{
          title: 'Emotions',
          tabBarIcon: ({ color, size }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-routine"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Plus size={size} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <UserCog size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
  },
});