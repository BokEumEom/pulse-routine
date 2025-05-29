import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Bell, Moon, HelpCircle, LogOut } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {
  const profileSettings = [
    { icon: <Settings size={24} color={Colors.text.secondary} />, title: '설정', screen: 'settings' },
    { icon: <Bell size={24} color={Colors.text.secondary} />, title: '알림', screen: 'notifications' },
    { icon: <Moon size={24} color={Colors.text.secondary} />, title: '테마', screen: 'theme' },
    { icon: <HelpCircle size={24} color={Colors.text.secondary} />, title: '도움말', screen: 'help' },
    { icon: <LogOut size={24} color={Colors.error} />, title: '로그아웃', screen: 'logout' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>프로필</Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>김유진</Text>
            <Text style={styles.profileEmail}>yujin.kim@example.com</Text>
          </View>
          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>수정</Text>
          </Pressable>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>완료한 루틴</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>감정 기록</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>연결된 팀원</Text>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>설정</Text>
          {profileSettings.map((item, index) => (
            <Pressable 
              key={index} 
              style={styles.settingItem}
            >
              <View style={styles.settingIconContainer}>
                {item.icon}
              </View>
              <Text style={[
                styles.settingText, 
                item.title === '로그아웃' && styles.logoutText
              ]}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>PulseRoutine v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: 2,
  },
  editButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.border,
    alignSelf: 'center',
  },
  settingsContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  logoutText: {
    color: Colors.error,
  },
  versionContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.tertiary,
  },
});