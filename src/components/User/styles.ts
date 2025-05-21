import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#eaf2fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#2b71c7',
    fontWeight: '600',
    fontSize: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  role: {
    fontSize: 14,
    color: '#6b7280',
  },
});
