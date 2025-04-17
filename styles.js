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
    marginBottom: 10,
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
    marginVertical: 5,
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
    alignItems: 'flex-start', // Align items at the top
    padding: 4,
  },
  itemName: {
    flex: 1, // Allow the name to take up available space
    flexWrap: 'wrap', // Wrap long text to the next line
    marginRight: 10, // Add spacing between the name and the price
    color: '#FFFFFF', // Ensure text color matches the theme
  },
  itemPrice: {
    color: '#FFFFFF', // Ensure text color matches the theme
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 10,
    color: '#34D399', // Mint green for links
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF', // White background for the modal
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10, // Add spacing between buttons
  },
  smallButton: {
    backgroundColor: '#34D399', // Mint green button
    paddingVertical: 10, // Ensure consistent vertical padding
    paddingHorizontal: 15, // Ensure consistent horizontal padding
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, // Set a fixed width for consistency
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export const commonStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#34D399', // Mint green border
    padding: 12,
    marginBottom: 10,
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
    marginBottom: 10,
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
