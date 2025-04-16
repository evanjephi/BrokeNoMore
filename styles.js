import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#8B5CF6', // Light purple background
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for headers
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#5B21B6', // Dark purple section background
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for section headers
    marginBottom: 10,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#34D399', // Mint green divider
    marginTop: 10,
  },
  budgetContainer: {
    marginVertical: 20,
    backgroundColor: '#5B21B6', // Dark purple background for budget
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#FFFFFF', // White background for progress bar
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 10,
  },
  progress: {
    height: '100%',
    borderRadius: 6,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // Removed borderBottomWidth and borderBottomColor to eliminate underlines
  },
});

export const commonStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#34D399', // Mint green border
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF', // White background for inputs
    color: '#000000', // Black text for inputs
    fontSize: 16,
  },
  button: {
    backgroundColor: '#34D399', // Mint green button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF', // White text for buttons
    fontWeight: 'bold',
    fontSize: 16,
  },
});
