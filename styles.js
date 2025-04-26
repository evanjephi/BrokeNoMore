import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: 'linear-gradient(180deg, #8B5CF6 0%, #5B21B6 100%)', // Purplish gradient background
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FACC15', // Muted Gold for headings
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
    backgroundColor: '#5B21B6', // White background for sections
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A7F3D0', // Light Mint for section headers
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB', // Light gray border
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
    backgroundColor: '#FFFFFF', // White background for inputs
    color: '#1F2937', // Dark gray text for inputs
    fontSize: 16,
  },
  button: {
    backgroundColor: '#A7F3D0', // Light Mint for buttons
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#1F2937', // Dark Gray for button text
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // White for item names
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FACC15', // Muted Gold for item prices
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10, // Add spacing between buttons
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pauseButton: {
    backgroundColor: '#FED7AA', // Red for pause
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#FACC15', // Golden yellow for edit
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF', // White background for the modal
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  budgetContainer: {
    marginVertical: 10,
    backgroundColor: '#5B21B6', // Dark purple background for the budget container
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressBar: {
    height: 14, // Slightly taller for better visibility
    backgroundColor: '#CBD5E1', // Cool Blue-Gray for the background of the progress bar
    borderRadius: 7, // Rounded corners
    overflow: 'hidden',
    marginTop: 10,
    width: '100%', // Ensure the progress bar spans the full width of the container
  },
  progress: {
    height: '100%',
    borderRadius: 7,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB', // Soft Gray divider
    marginTop: 10,
  },
});

export const commonStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB', // Light gray border
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF', // White background for inputs
    color: '#1F2937', // Dark gray text for inputs
    fontSize: 16,
  },
  button: {
    backgroundColor: '#A7F3D0', // Light Mint for buttons
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#1F2937', // Dark Gray for button text
    fontWeight: 'bold',
    fontSize: 16,
  },
});
