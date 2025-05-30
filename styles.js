import { StyleSheet } from 'react-native';
import { Colors } from './constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: Colors.light.background, // Dynamic background
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    color: Colors.light.subTitleColor, // Dynamic primary text color
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint, // Dynamic primary text color
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
    backgroundColor: Colors.light.background, // Dynamic input background
    color: Colors.light.text, // Dynamic input text color
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.light.primary, // Dynamic button background
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
    color: '#FFFFFF', // White text for all buttons
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
    fontWeight: '500',
    color: Colors.light.text, // Dynamic primary text color
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light.text, // Dynamic secondary text color
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
    backgroundColor: '#FFB74D', // Warm Amber for Pause
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#003366', // Soft Blue for Edit
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#FFB74D', // Emerald Green for Save
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#B0BEC5', // Cool Gray for Cancel
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    backgroundColor: '#E53935', // Strong Red for Remove
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: Colors.light.background, // Dynamic modal background
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
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressBar: {
    height: 14,
    backgroundColor: Colors.light.secondary, // Dynamic progress bar background
    borderRadius: 7,
    overflow: 'hidden',
    marginTop: 10,
    width: '100%',
  },
  progress: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: Colors.light.primary, 
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border, // Dynamic divider color
    marginTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export const commonStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.light.inputBackground, // Dynamic border color
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.inputBackground, // Dynamic input background
    color: Colors.light.inputBackground, // Dynamic input text color
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.light.tint, // Dynamic button background
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.light.background, // Dynamic button text color
    fontWeight: 'bold',
    fontSize: 16,
  },
});
