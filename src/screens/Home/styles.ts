import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  selectedRadio: {
    backgroundColor: '#e5f0ff',
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#2563eb',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#111827',
  },
  searchInput: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 10,
  },
  linkButton: {
    marginBottom: 10,
  },
  linkText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
});
